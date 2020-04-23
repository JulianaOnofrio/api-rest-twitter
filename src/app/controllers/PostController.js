/* eslint-disable no-underscore-dangle */
import * as Yup from 'yup';
import Post from '../schemas/Post';
import User from '../schemas/User';

class PostController {
  async store(req, res) {
    const schema = Yup.object().shape({
      text: Yup.string().required(),
      author_id: Yup.string().required(),
    });

    if (!(await schema.isValid({ ...req.body, author_id: req.userId }))) {
      return res.status(400).json('Posts cannot be empty. Write something.');
    }

    const post = await Post.create({
      text: req.body.text,
      author_id: req.userId,
    });

    return res.json(post);
  }

  async index(req, res) {
    const posts = await Post.find().sort({
      createdAt: -1,
    });

    return res.json(posts);
  }

  async show(req, res) {
    const user = await User.findOne({ username: req.params.author });

    const posts = await Post.find({ author_id: user._id }).sort({
      createdAt: -1,
    });

    return res.json(posts);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      text: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json('Posts cannot be empty. Write something.');
    }

    const post = await Post.findById(req.params._id);

    if (post.author_id !== req.userId)
      return res.status(401).json('Non authorized');

    await post.updateOne({
      text: req.body.text,
    });

    return res.json(post);
  }

  async destroy(req, res) {
    const post = await Post.findById(req.params._id);

    if (!post) return res.status(400).json('No post found.');
    if (post.author_id !== req.userId)
      return res.status(401).json('Non authorized');

    await post.remove();

    return res.json(`Post removed!`);
  }
}

export default new PostController();
