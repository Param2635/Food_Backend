// For now, we'll use in-memory data (easy for testing)
// Later we'll connect to database

let foods = [
  { id: 1, name: "Pizza Margherita", price: 299, category: "Italian" },
  { id: 2, name: "Butter Chicken", price: 349, category: "Indian" }
];

export const getAllFoods = (req, res) => {
  res.json({
    success: true,
    count: foods.length,
    data: foods
  });
};

export const getFoodById = (req, res) => {
  const food = foods.find(f => f.id === parseInt(req.params.id));
  if (!food) {
    return res.status(404).json({ success: false, message: "Food not found" });
  }
  res.json({ success: true, data: food });
};

export const addFood = (req, res) => {
  const { name, price, category } = req.body;
  if (!name || !price) {
    return res.status(400).json({ success: false, message: "Name and price are required" });
  }

  const newFood = {
    id: foods.length + 1,
    name,
    price: Number(price),
    category: category || "Uncategorized"
  };

  foods.push(newFood);
  res.status(201).json({ success: true, message: "Food added", data: newFood });
};