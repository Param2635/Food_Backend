import db from '../config/database.js';

export const getAllFoods = (req, res) => {
  try {
    const stmt = db.prepare('SELECT * FROM foods ORDER BY id DESC');
    const foods = stmt.all();

    res.json({
      success: true,
      count: foods.length,
      data: foods
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getFoodById = (req, res) => {
  try {
    const stmt = db.prepare('SELECT * FROM foods WHERE id = ?');
    const food = stmt.get(req.params.id);

    if (!food) {
      return res.status(404).json({ success: false, message: "Food not found" });
    }

    res.json({ success: true, data: food });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const addFood = (req, res) => {
  try {
    const { name, price, category, description, image_url, is_available } = req.body;

    if (!name || !price) {
      return res.status(400).json({ 
        success: false, 
        message: "Name and price are required" 
      });
    }

    const stmt = db.prepare(`
      INSERT INTO foods (name, price, category, description, image_url, is_available)
      VALUES (?, ?, ?, ?, ?, ?)
    `);

    const result = stmt.run(
      name,
      Number(price),
      category || null,
      description || null,
      image_url || null,
      is_available === false ? 0 : 1     // Convert to 0 or 1
    );

    res.status(201).json({
      success: true,
      message: "Food added successfully",
      data: { 
        id: result.lastInsertRowid, 
        name, 
        price: Number(price), 
        category, 
        description, 
        image_url, 
        is_available: is_available === false ? 0 : 1 
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};