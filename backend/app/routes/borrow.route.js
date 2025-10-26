const express = require('express');
const router = require('express').Router();

const BorrowController = require('../controllers/borrow.controller');

// Tao phieu muon moi
router.post('/', BorrowController.createBorrow);

// Doc du lieu tat ca phieu muon
router.get('/', BorrowController.getAllBorrows);

// Doc du lieu phieu muon theo ID
router.get('/:id', BorrowController.getBorrowById);

// Cap nhat phieu muon
router.put('/:id', BorrowController.updateBorrow);

// Xoa phieu muon
router.delete('/:id', BorrowController.deleteBorrow);

module.exports = router;