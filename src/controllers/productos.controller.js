import { pool } from "../db.js";

export const getProductos = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM producto");
    res.json(rows);
  } catch (error) {
    return res.status(500).json({ message: "No funcionó" });
  }
};

export const getProducto = async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await pool.query("SELECT * FROM producto WHERE id = ?", [
      id,
    ]);

    if (rows.length <= 0) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }

    res.json(rows[0]);
  } catch (error) {
    return res.status(500).json({ message: "No funcionó" });
  }
};

export const deleteProducto = async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await pool.query("DELETE FROM producto WHERE id = ?", [id]);

    if (rows.affectedRows <= 0) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }

    res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: "No funcionó" });
  }
};

export const createProducto = async (req, res) => {
  try {
    const { name, precio } = req.body;
    const [rows] = await pool.query(
      "INSERT INTO producto (name, precio) VALUES (?, ?)",
      [name, precio]
    );
    res.status(201).json({ id: rows.insertId, name, precio });
  } catch (error) {
    return res.status(500).json({ message: "No funcionó" });
  }
};

export const updateProducto = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, precio } = req.body;

    const [result] = await pool.query(
      "UPDATE producto SET name = IFNULL(?, name), precio = IFNULL(?, precio) WHERE id = ?",
      [name, precio, id]
    );

    if (result.affectedRows === 0)
      return res.status(404).json({ message: "Producto no encontrado" });

    const [rows] = await pool.query("SELECT * FROM producto WHERE id = ?", [
      id,
    ]);

    res.json(rows[0]);
  } catch (error) {
    return res.status(500).json({ message: "No funcionó" });
  }
};
