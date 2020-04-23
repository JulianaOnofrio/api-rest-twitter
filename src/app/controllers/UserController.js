/* eslint-disable no-underscore-dangle */
import * as Yup from 'yup';
import bcrypt from 'bcryptjs';
import User from '../schemas/User';

class UserController {
  async store(req, res) {
    const schema = Yup.object().shape({
      username: Yup.string().required(),
      email: Yup.string().email(),
      password: Yup.string().required().min(6),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json('Validation failed');
    }

    const userExists = await User.findOne({
      $or: [{ email: req.body.email }, { username: req.body.username }],
    });

    if (userExists) {
      return res.status(400).json({ error: 'User already exists' });
    }
    const { id, username, email } = await User.create(req.body);

    return res.json({ id, username, email });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string().email().required(),
      oldPassword: Yup.string().required().min(6),
      password: Yup.string().required().min(6),
      confirmPassword: Yup.string().when('password', (password, field) =>
        password ? field.required().oneOf([Yup.ref('password')]) : field
      ),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json('Validation failed');
    }
    const { oldPassword } = req.body;

    const user = await User.findById(req.userId);

    if (oldPassword && !(await bcrypt.compare(oldPassword, user.password))) {
      res.status(400).json({ error: 'Wrong password' });
    }

    if (user._id !== req.userId) return res.status(401).json('Non authorized');

    await user.updateOne({
      ...req.body,
      password: await bcrypt.hash(req.body.password, 8),
    });

    return res.json(`${user.username}'s profile updated!`);
  }

  async index(req, res) {
    const users = await User.find();

    return res.json(users);
  }

  async destroy(req, res) {
    const user = await User.findById(req.userId);

    if (user._id !== req.userId) return res.status(401).json('Non authorized');

    await user.remove();

    return res.json({ msg: `User ${user.username} was deleted!` });
  }
}
export default new UserController();
