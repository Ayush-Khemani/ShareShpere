const zod = require('zod');

const DonateItemSchema = zod.object({
    name : zod.string(),
    category : zod.literal(['Furniture', "Electronics", "Clothing", "Books", "Toys", "Kitchenware", "Groceries", "Home Decor", "Cleaning Supplies", "Miscellaneous"]),
    condition : zod.literal(['New', 'Like New', "Good", "Fair", "Needs Repair", "For Parts"]) 
});

module.exports = {
    DonateItemSchema
}