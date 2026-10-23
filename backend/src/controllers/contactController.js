const ContactMessage = require('../models/ContactMessage');

// @desc    Submit citizen message/grievance
// @route   POST /api/contact
// @access  Public
const submitContact = async (req, res, next) => {
  try {
    const { fullName, phone, email, mandalOrArea, subject, message } = req.body;

    if (!fullName || !fullName.trim()) {
      return res.status(400).json({ success: false, message: 'Please enter your full name' });
    }

    if (!phone || !phone.trim()) {
      return res.status(400).json({ success: false, message: 'Please enter a valid phone number' });
    }

    if (!subject || !subject.trim()) {
      return res.status(400).json({ success: false, message: 'Please provide a subject' });
    }

    if (!message || !message.trim()) {
      return res.status(400).json({ success: false, message: 'Please enter your message or grievance details' });
    }

    const newMessage = await ContactMessage.create({
      fullName: fullName.trim(),
      phone: phone.trim(),
      email: email ? email.trim() : '',
      mandalOrArea: mandalOrArea ? mandalOrArea.trim() : '',
      subject: subject.trim(),
      message: message.trim(),
    });

    res.status(201).json({
      success: true,
      message: 'Your message has been safely received by the Office of Gandra Venkata Ramana Reddy. Our team will review and respond promptly.',
      data: { id: newMessage._id, createdAt: newMessage.createdAt },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all contact messages
// @route   GET /api/contact
// @access  Private (Admin)
const getContactMessages = async (req, res, next) => {
  try {
    const { status } = req.query;
    const filter = {};
    if (status && status !== 'All') {
      filter.status = status;
    }

    const messages = await ContactMessage.find(filter).sort({ createdAt: -1 });
    res.json({
      success: true,
      count: messages.length,
      data: messages,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update contact message status / notes
// @route   PUT /api/contact/:id
// @access  Private (Admin)
const updateContactStatus = async (req, res, next) => {
  try {
    const { status, notes } = req.body;
    const message = await ContactMessage.findById(req.params.id);

    if (!message) {
      return res.status(404).json({ success: false, message: 'Message not found' });
    }

    if (status) message.status = status;
    if (notes !== undefined) message.notes = notes;

    await message.save();

    res.json({
      success: true,
      message: 'Message status updated',
      data: message,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete contact message
// @route   DELETE /api/contact/:id
// @access  Private (Admin)
const deleteContactMessage = async (req, res, next) => {
  try {
    const message = await ContactMessage.findByIdAndDelete(req.params.id);
    if (!message) {
      return res.status(404).json({ success: false, message: 'Message not found' });
    }
    res.json({
      success: true,
      message: 'Message deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  submitContact,
  getContactMessages,
  updateContactStatus,
  deleteContactMessage,
};
