/* eslint-disable no-underscore-dangle */
import * as Yup from 'yup';
import Comment from '../schemas/Comment';

class CommentController {
  async store(req, res) {
    const schema = Yup.object().shape({
      text: Yup.string().required(),
      author_id: Yup.string().required(),
      post_id: Yup.string().required(),
    });

    if (
      !(await schema.isValid({
        ...req.body,
        ...req.params,
        author_id: req.userId,
      }))
    ) {
      return res.status(400).json('Comments cannot be empty. Write something.');
    }

    const comment = await Comment.create({
      text: req.body.text,
      author_id: req.userId,
      post_id: req.params.post_id,
    });

    return res.json(comment);
  }

  async index(req, res) {
    const comments = await Comment.find({ post_id: req.params.post_id }).sort({
      createdAt: -1,
    });

    return res.json(comments);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      text: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json('Comments cannot be empty. Write something.');
    }

    const comment = await Comment.findById(req.params.comment_id);

    if (comment.author_id !== req.userId)
      return res.status(401).json('Non authorized');

    await comment.updateOne({
      text: req.body.text,
    });

    return res.json(comment);
  }

  async destroy(req, res) {
    const comment = await Comment.findById(req.params.comment_id);

    if (!comment) return res.status(400).json('No comment found.');

    if (comment.author_id !== req.userId)
      return res.status(401).json('Non authorized');

    await comment.remove();

    return res.json(`Comment removed!`);
  }
}

export default new CommentController();
