const Contact = require('../models/Contact');
const AppError = require('../utils/appError');

const catchAsync = fn => {
  return (req, res, next) => {
    fn(req, res, next).catch(next);
  };
};

exports.submitContact = catchAsync(async (req, res, next) => {
  const { name, email, subject, message } = req.body;

  const newContact = await Contact.create({
    name,
    email,
    subject,
    message
  });

  res.status(201).json({
    status: 'success',
    message: 'Message sent successfully!',
    data: { contact: newContact }
  });
});

exports.getAllMessages = catchAsync(async (req, res, next) => {
  const messages = await Contact.find().sort({ createdAt: -1 });

  res.status(200).json({
    status: 'success',
    results: messages.length,
    data: { messages }
  });
});

exports.deleteMessage = catchAsync(async (req, res, next) => {
  const message = await Contact.findByIdAndDelete(req.params.id);

  if (!message) {
    return next(new AppError('No message found with that ID', 404));
  }

  res.status(204).json({
    status: 'success',
    data: null
  });
});
