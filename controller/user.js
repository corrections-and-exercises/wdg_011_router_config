import pool from '../client.js';
import ErrorResponse from '../utils/ErrorResponse.js';

export const getUser = async (req, res, next) => {
  try {
    const {rows} = await pool.query('SELECT * from users');
    res.json({data: rows});
  } catch (error) {
    next(error);
  }
};

export const getUserById = async (req, res, next) => {
  try {
    res.json({data: req.user});
  } catch (error) {
    next(error);
  }
};

export const createUser = async (req, res, next) => {
  try {
    const {firstname, lastname} = req.body;
    if (!firstname || !lastname) throw new ErrorResponse('input invalid', 400);

    const {rows} = await pool.query(
      'INSERT INTO users (firstname, lastname) VALUES ($1, $2) RETURNING * ',
      [firstname, lastname]
    );
    return res.status(201).json({message: 'User created', data: rows});
  } catch (error) {
    next(error);
  }
};

export const updateUser = async (req, res, next) => {
  try {
    const {id} = req.params;
    const {firstname, lastname} = req.body;

    const {rows} = await pool.query(
      'UPDATE users set firstname = $1, lastname = $2 WHERE id = $3 RETURNING * ',
      [firstname, lastname, id]
    );
    return res.json({message: 'user updated', data: rows});
  } catch (error) {
    next(error);
  }
};

export const deleteUserById = async (req, res, next) => {
  const {id} = req.params;
  try {
    const {rows} = await pool.query(
      'DELETE from users WHERE id = $1 RETURNING*',
      [id]
    );
    return res.json({message: 'user deleted', data: rows});
  } catch (error) {
    next(error);
  }
};
