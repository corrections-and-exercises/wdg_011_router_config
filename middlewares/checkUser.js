import pool from '../client.js';
import ErrorResponse from '../utils/ErrorResponse.js';

export const checkUser = async (req, res, next) => {
  const {id} = req.params;
  try {
    const {rows} = await pool.query('SELECT * from users WHERE id = $1', [id]);
    if (!rows.length > 0) throw new ErrorResponse('User not found', 400);
    req.user = rows[0];
    next();
  } catch (error) {
    next(error);
  }
};
