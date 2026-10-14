import type { ChickenGrimoire } from '../types';
import recipeComments from './recipeComments.json';

// Recipe contents preserved from chicken.json; ui contains presentation-only metadata.
export const chickenGrimoire: ChickenGrimoire = {
  title: 'The Chicken Grimoire',
  edition: 'D20',
  servingBase: {
    ingredient: 'chicken breast',
    amount: 500,
    unit: 'g',
    state: 'raw',
  },
  recipes: [
    {
      id: 1,
      name: 'Classic Garlic',
      flavor: 'Savory, garlicky, simple',
      region: 'European',
      ingredients: [
        {
          name: 'Olive oil',
          amount: 15,
          unit: 'ml',
        },
        {
          name: 'Garlic',
          amount: 2,
          unit: 'cloves',
        },
        {
          name: 'Salt',
          amount: 4,
          unit: 'g',
        },
        {
          name: 'Black pepper',
          amount: 0.5,
          unit: 'tsp',
        },
      ],
      marinationMinutes: {
        min: 30,
        max: 240,
      },
      notes: 'A versatile everyday marinade. Mince or crush the garlic before mixing.',
      ui: {
        category: 'Savory',
        accentColor: '#72502c',
        image: 'recipe-cards/Classic Garlic.png',
      },
    },
    {
      id: 2,
      name: 'Lemon Pepper',
      flavor: 'Bright, citrusy, peppery',
      region: 'American',
      ingredients: [
        {
          name: 'Olive oil',
          amount: 15,
          unit: 'ml',
        },
        {
          name: 'Lemon zest',
          amount: 2,
          unit: 'tsp',
        },
        {
          name: 'Coarsely ground black pepper',
          amount: 0.75,
          unit: 'tsp',
        },
        {
          name: 'Garlic powder',
          amount: 0.5,
          unit: 'tsp',
        },
        {
          name: 'Salt',
          amount: 4,
          unit: 'g',
        },
        {
          name: 'Lemon juice',
          amount: 5,
          unit: 'ml',
        },
      ],
      marinationMinutes: {
        min: 30,
        max: 120,
      },
      notes: 'Use fresh lemon zest for the most pronounced citrus aroma.',
      ui: {
        category: 'Herby',
        accentColor: '#547034',
        image: 'recipe-cards/Lemon Pepper.png',
      },
    },
    {
      id: 3,
      name: 'Greek Souvlaki',
      flavor: 'Lemony, herbal, Mediterranean',
      region: 'Greek',
      ingredients: [
        {
          name: 'Olive oil',
          amount: 15,
          unit: 'ml',
        },
        {
          name: 'Lemon juice',
          amount: 20,
          unit: 'ml',
        },
        {
          name: 'Dried oregano',
          amount: 1.5,
          unit: 'tsp',
        },
        {
          name: 'Garlic',
          amount: 2,
          unit: 'cloves',
        },
        {
          name: 'Salt',
          amount: 4,
          unit: 'g',
        },
        {
          name: 'Black pepper',
          amount: 0.25,
          unit: 'tsp',
        },
      ],
      marinationMinutes: {
        min: 30,
        max: 180,
      },
      notes:
        'A classic Greek-inspired marinade. Avoid marinating much longer than recommended because of the lemon juice.',
      ui: {
        category: 'Herby',
        accentColor: '#547034',
        image: 'recipe-cards/Greek Souvlaki.png',
      },
    },
    {
      id: 4,
      name: 'Honey Mustard',
      flavor: 'Sweet, tangy, mildly sharp',
      region: 'European',
      ingredients: [
        {
          name: 'Dijon mustard',
          amount: 20,
          unit: 'g',
        },
        {
          name: 'Honey',
          amount: 12,
          unit: 'g',
        },
        {
          name: 'Olive oil',
          amount: 10,
          unit: 'ml',
        },
        {
          name: 'Apple cider vinegar',
          amount: 10,
          unit: 'ml',
        },
        {
          name: 'Garlic powder',
          amount: 0.5,
          unit: 'tsp',
        },
        {
          name: 'Salt',
          amount: 2,
          unit: 'g',
        },
        {
          name: 'Black pepper',
          amount: 0.25,
          unit: 'tsp',
        },
      ],
      marinationMinutes: {
        min: 30,
        max: 120,
      },
      notes: 'Remove excess marinade before grilling to prevent the honey from burning.',
      ui: {
        category: 'Sweet',
        accentColor: '#a57321',
        image: 'recipe-cards/Honey Mustard.png',
      },
    },
    {
      id: 5,
      name: 'Chicken Shawarma',
      flavor: 'Warm, aromatic, Middle Eastern spices',
      region: 'Middle Eastern',
      ingredients: [
        {
          name: 'Plain yogurt',
          amount: 50,
          unit: 'g',
        },
        {
          name: 'Olive oil',
          amount: 10,
          unit: 'ml',
        },
        {
          name: 'Lemon juice',
          amount: 10,
          unit: 'ml',
        },
        {
          name: 'Ground cumin',
          amount: 1,
          unit: 'tsp',
        },
        {
          name: 'Ground coriander',
          amount: 1,
          unit: 'tsp',
        },
        {
          name: 'Paprika',
          amount: 1,
          unit: 'tsp',
        },
        {
          name: 'Turmeric',
          amount: 0.5,
          unit: 'tsp',
        },
        {
          name: 'Ground cinnamon',
          amount: 0.125,
          unit: 'tsp',
        },
        {
          name: 'Garlic',
          amount: 2,
          unit: 'cloves',
        },
        {
          name: 'Salt',
          amount: 4,
          unit: 'g',
        },
      ],
      marinationMinutes: {
        min: 120,
        max: 480,
      },
      notes: 'Ground coriander refers to coriander seeds, not fresh cilantro leaves.',
      ui: {
        category: 'Savory',
        accentColor: '#72502c',
        image: 'recipe-cards/Chicken Shawarma.png',
      },
    },
    {
      id: 6,
      name: 'Tandoori',
      flavor: 'Bold, aromatic, yogurt-spiced',
      region: 'Indian',
      ingredients: [
        {
          name: 'Plain yogurt',
          amount: 80,
          unit: 'g',
        },
        {
          name: 'Garam masala',
          amount: 1.5,
          unit: 'tsp',
        },
        {
          name: 'Paprika',
          amount: 1,
          unit: 'tsp',
        },
        {
          name: 'Ground cumin',
          amount: 0.5,
          unit: 'tsp',
        },
        {
          name: 'Turmeric',
          amount: 0.25,
          unit: 'tsp',
        },
        {
          name: 'Fresh ginger',
          amount: 8,
          unit: 'g',
        },
        {
          name: 'Garlic',
          amount: 2,
          unit: 'cloves',
        },
        {
          name: 'Lemon juice',
          amount: 10,
          unit: 'ml',
        },
        {
          name: 'Salt',
          amount: 4,
          unit: 'g',
        },
      ],
      marinationMinutes: {
        min: 120,
        max: 480,
      },
      notes:
        'Grate the ginger and garlic finely. Remove thick excess yogurt marinade before grilling.',
      ui: {
        category: 'Savory',
        accentColor: '#72502c',
        image: 'recipe-cards/Tandoori.png',
      },
    },
    {
      id: 7,
      name: 'Piri-Piri',
      flavor: 'Hot, tangy, garlicky',
      region: 'Portuguese-African',
      ingredients: [
        {
          name: 'Olive oil',
          amount: 15,
          unit: 'ml',
        },
        {
          name: 'Lemon juice',
          amount: 15,
          unit: 'ml',
        },
        {
          name: 'Fresh hot red chili',
          amount: 5,
          unit: 'g',
          maxAmount: 10,
        },
        {
          name: 'Paprika',
          amount: 1,
          unit: 'tsp',
        },
        {
          name: 'Garlic',
          amount: 3,
          unit: 'cloves',
        },
        {
          name: 'White wine vinegar',
          amount: 5,
          unit: 'ml',
        },
        {
          name: 'Dried oregano',
          amount: 0.5,
          unit: 'tsp',
        },
        {
          name: 'Salt',
          amount: 4,
          unit: 'g',
        },
      ],
      marinationMinutes: {
        min: 60,
        max: 240,
      },
      notes: 'Adjust the chili quantity to your preferred heat level.',
      ui: {
        category: 'Spicy',
        accentColor: '#aa3d23',
        image: 'recipe-cards/Piri-Piri.png',
      },
    },
    {
      id: 8,
      name: 'Jamaican Jerk',
      flavor: 'Spicy, earthy, warm, aromatic',
      region: 'Jamaican',
      ingredients: [
        {
          name: 'Olive oil',
          amount: 15,
          unit: 'ml',
        },
        {
          name: 'Lime juice',
          amount: 15,
          unit: 'ml',
        },
        {
          name: 'Ground allspice',
          amount: 1,
          unit: 'tsp',
        },
        {
          name: 'Dried thyme',
          amount: 1,
          unit: 'tsp',
        },
        {
          name: 'Fresh ginger',
          amount: 8,
          unit: 'g',
        },
        {
          name: 'Garlic',
          amount: 2,
          unit: 'cloves',
        },
        {
          name: 'Fresh hot chili',
          amount: 5,
          unit: 'g',
          maxAmount: 10,
        },
        {
          name: 'Brown sugar',
          amount: 5,
          unit: 'g',
        },
        {
          name: 'Ground cinnamon',
          amount: 0.25,
          unit: 'tsp',
        },
        {
          name: 'Ground nutmeg',
          amount: 0.125,
          unit: 'tsp',
        },
        {
          name: 'Salt',
          amount: 4,
          unit: 'g',
        },
      ],
      marinationMinutes: {
        min: 120,
        max: 480,
      },
      notes:
        'Allspice is essential to the jerk flavor. Use regular hot chili if Scotch bonnet is unavailable.',
      ui: {
        category: 'Spicy',
        accentColor: '#aa3d23',
        image: 'recipe-cards/Jamaican Jerk.png',
      },
    },
    {
      id: 9,
      name: 'Pollo Asado',
      flavor: 'Citrusy, smoky, mildly spicy',
      region: 'Mexican',
      ingredients: [
        {
          name: 'Orange juice',
          amount: 40,
          unit: 'ml',
        },
        {
          name: 'Lime juice',
          amount: 15,
          unit: 'ml',
        },
        {
          name: 'Olive oil',
          amount: 10,
          unit: 'ml',
        },
        {
          name: 'Smoked paprika',
          amount: 1,
          unit: 'tsp',
        },
        {
          name: 'Ground cumin',
          amount: 1,
          unit: 'tsp',
        },
        {
          name: 'Dried oregano',
          amount: 0.5,
          unit: 'tsp',
        },
        {
          name: 'Garlic',
          amount: 2,
          unit: 'cloves',
        },
        {
          name: 'Chili powder',
          amount: 0.25,
          unit: 'tsp',
        },
        {
          name: 'Salt',
          amount: 4,
          unit: 'g',
        },
      ],
      marinationMinutes: {
        min: 60,
        max: 240,
      },
      notes: 'The orange and lime combination creates a bright citrus marinade.',
      ui: {
        category: 'Savory',
        accentColor: '#72502c',
        image: 'recipe-cards/Pollo Asado.png',
      },
    },
    {
      id: 10,
      name: 'Balsamic Herb',
      flavor: 'Tangy, herbal, slightly sweet',
      region: 'Italian',
      ingredients: [
        {
          name: 'Balsamic vinegar',
          amount: 20,
          unit: 'ml',
        },
        {
          name: 'Olive oil',
          amount: 15,
          unit: 'ml',
        },
        {
          name: 'Dried rosemary',
          amount: 0.5,
          unit: 'tsp',
        },
        {
          name: 'Dried thyme',
          amount: 0.5,
          unit: 'tsp',
        },
        {
          name: 'Garlic',
          amount: 2,
          unit: 'cloves',
        },
        {
          name: 'Dijon mustard',
          amount: 5,
          unit: 'g',
        },
        {
          name: 'Salt',
          amount: 3,
          unit: 'g',
        },
        {
          name: 'Black pepper',
          amount: 0.25,
          unit: 'tsp',
        },
      ],
      marinationMinutes: {
        min: 30,
        max: 180,
      },
      notes: 'A thin coating works best on a contact grill.',
      ui: {
        category: 'Herby',
        accentColor: '#547034',
        image: 'recipe-cards/Balsamic Herb.png',
      },
    },
    {
      id: 11,
      name: 'Korean Gochujang',
      flavor: 'Spicy, sweet, savory, umami-rich',
      region: 'Korean',
      ingredients: [
        {
          name: 'Gochujang paste',
          amount: 25,
          unit: 'g',
        },
        {
          name: 'Soy sauce',
          amount: 15,
          unit: 'ml',
        },
        {
          name: 'Rice vinegar',
          amount: 10,
          unit: 'ml',
        },
        {
          name: 'Honey',
          amount: 10,
          unit: 'g',
        },
        {
          name: 'Sesame oil',
          amount: 5,
          unit: 'ml',
        },
        {
          name: 'Fresh ginger',
          amount: 8,
          unit: 'g',
        },
        {
          name: 'Garlic',
          amount: 2,
          unit: 'cloves',
        },
      ],
      marinationMinutes: {
        min: 60,
        max: 240,
      },
      notes: 'Gochujang and honey can caramelize quickly. Wipe off excess paste before grilling.',
      ui: {
        category: 'Spicy',
        accentColor: '#aa3d23',
        image: 'recipe-cards/Korean Gochujang.png',
      },
    },
    {
      id: 12,
      name: 'Sun-Dried Tomato & Basil',
      flavor: 'Rich, savory, tomato-forward, herbal',
      region: 'Italian',
      ingredients: [
        {
          name: 'Sun-dried tomatoes in oil',
          amount: 40,
          unit: 'g',
        },
        {
          name: 'Oil from tomato jar',
          amount: 10,
          unit: 'ml',
        },
        {
          name: 'Garlic',
          amount: 2,
          unit: 'cloves',
        },
        {
          name: 'Dried basil',
          amount: 1,
          unit: 'tsp',
        },
        {
          name: 'Dried oregano',
          amount: 0.5,
          unit: 'tsp',
        },
        {
          name: 'Lemon juice',
          amount: 5,
          unit: 'ml',
        },
        {
          name: 'Black pepper',
          amount: 0.25,
          unit: 'tsp',
        },
        {
          name: 'Salt',
          amount: 2,
          unit: 'g',
        },
      ],
      marinationMinutes: {
        min: 60,
        max: 240,
      },
      notes:
        'Blend the ingredients into a paste. Remove large tomato pieces before grilling to prevent scorching.',
      ui: {
        category: 'Herby',
        accentColor: '#547034',
        image: 'recipe-cards/Sun-Dried Tomato & Basil.png',
      },
    },
    {
      id: 13,
      name: 'Vietnamese Lemongrass',
      flavor: 'Fragrant, citrusy, savory',
      region: 'Vietnamese',
      ingredients: [
        {
          name: 'Fresh lemongrass',
          amount: 20,
          unit: 'g',
        },
        {
          name: 'Fish sauce',
          amount: 20,
          unit: 'ml',
        },
        {
          name: 'Lime juice',
          amount: 10,
          unit: 'ml',
        },
        {
          name: 'Brown sugar',
          amount: 8,
          unit: 'g',
        },
        {
          name: 'Garlic',
          amount: 2,
          unit: 'cloves',
        },
        {
          name: 'Vegetable oil',
          amount: 10,
          unit: 'ml',
        },
        {
          name: 'Black pepper',
          amount: 0.25,
          unit: 'tsp',
        },
      ],
      marinationMinutes: {
        min: 60,
        max: 240,
      },
      notes:
        'Finely mince the tender inner part of the lemongrass stalk. Remove fibrous pieces before grilling.',
      ui: {
        category: 'Savory',
        accentColor: '#72502c',
        image: 'recipe-cards/Vietnamese Lemongrass.png',
      },
    },
    {
      id: 14,
      name: 'Thai Satay',
      flavor: 'Nutty, creamy, gently spiced',
      region: 'Thai',
      ingredients: [
        {
          name: 'Coconut milk',
          amount: 50,
          unit: 'ml',
        },
        {
          name: 'Unsweetened peanut butter',
          amount: 15,
          unit: 'g',
        },
        {
          name: 'Yellow curry powder',
          amount: 1,
          unit: 'tsp',
        },
        {
          name: 'Soy sauce',
          amount: 10,
          unit: 'ml',
        },
        {
          name: 'Lime juice',
          amount: 10,
          unit: 'ml',
        },
        {
          name: 'Brown sugar',
          amount: 5,
          unit: 'g',
        },
        {
          name: 'Turmeric',
          amount: 0.25,
          unit: 'tsp',
        },
        {
          name: 'Garlic',
          amount: 1,
          unit: 'clove',
        },
      ],
      marinationMinutes: {
        min: 60,
        max: 240,
      },
      notes:
        'Remove excess peanut marinade before grilling because thick nut-based coatings can burn.',
      ui: {
        category: 'Savory',
        accentColor: '#72502c',
        image: 'recipe-cards/Thai Satay.png',
      },
    },
    {
      id: 15,
      name: 'Huli Huli',
      flavor: 'Sweet, tangy, tropical, savory',
      region: 'Hawaiian',
      ingredients: [
        {
          name: 'Pineapple juice',
          amount: 40,
          unit: 'ml',
        },
        {
          name: 'Soy sauce',
          amount: 20,
          unit: 'ml',
        },
        {
          name: 'Brown sugar',
          amount: 8,
          unit: 'g',
        },
        {
          name: 'Ketchup',
          amount: 15,
          unit: 'g',
        },
        {
          name: 'Fresh ginger',
          amount: 10,
          unit: 'g',
        },
        {
          name: 'Garlic',
          amount: 2,
          unit: 'cloves',
        },
        {
          name: 'Rice vinegar',
          amount: 5,
          unit: 'ml',
        },
      ],
      marinationMinutes: {
        min: 30,
        max: 120,
      },
      notes:
        'Use pasteurized pineapple juice for predictable marination. Remove excess sugary marinade before grilling.',
      ui: {
        category: 'Sweet',
        accentColor: '#a57321',
        image: 'recipe-cards/Huli Huli.png',
      },
    },
    {
      id: 16,
      name: 'Chipotle Lime',
      flavor: 'Smoky, spicy, citrusy',
      region: 'Mexican',
      ingredients: [
        {
          name: 'Chipotle in adobo',
          amount: 20,
          unit: 'g',
        },
        {
          name: 'Lime juice',
          amount: 20,
          unit: 'ml',
        },
        {
          name: 'Olive oil',
          amount: 15,
          unit: 'ml',
        },
        {
          name: 'Honey',
          amount: 8,
          unit: 'g',
        },
        {
          name: 'Garlic',
          amount: 2,
          unit: 'cloves',
        },
        {
          name: 'Ground cumin',
          amount: 0.5,
          unit: 'tsp',
        },
        {
          name: 'Salt',
          amount: 3,
          unit: 'g',
        },
      ],
      marinationMinutes: {
        min: 60,
        max: 240,
      },
      notes: 'Blend the chipotle into the marinade. Adjust the amount to control heat.',
      ui: {
        category: 'Spicy',
        accentColor: '#aa3d23',
        image: 'recipe-cards/Chipotle Lime.png',
      },
    },
    {
      id: 17,
      name: 'Garlic Parmesan',
      flavor: 'Cheesy, garlicky, herbal',
      region: 'Italian-American',
      ingredients: [
        {
          name: 'Olive oil',
          amount: 15,
          unit: 'ml',
        },
        {
          name: 'Parmesan',
          amount: 20,
          unit: 'g',
        },
        {
          name: 'Garlic',
          amount: 2,
          unit: 'cloves',
        },
        {
          name: 'Dried basil',
          amount: 0.5,
          unit: 'tsp',
        },
        {
          name: 'Dried oregano',
          amount: 0.5,
          unit: 'tsp',
        },
        {
          name: 'Lemon juice',
          amount: 5,
          unit: 'ml',
        },
        {
          name: 'Black pepper',
          amount: 0.25,
          unit: 'tsp',
        },
        {
          name: 'Salt',
          amount: 2,
          unit: 'g',
        },
      ],
      marinationMinutes: {
        min: 30,
        max: 120,
      },
      notes:
        'For best results, reserve the Parmesan and add it after grilling rather than pressing cheese directly against the hot grill plates.',
      ui: {
        category: 'Savory',
        accentColor: '#72502c',
        image: 'recipe-cards/Garlic Parmesan.png',
      },
    },
    {
      id: 18,
      name: 'Buffalo Style',
      flavor: 'Hot, tangy, buttery',
      region: 'American',
      ingredients: [
        {
          name: 'Hot pepper sauce',
          amount: 35,
          unit: 'ml',
        },
        {
          name: 'Melted butter',
          amount: 15,
          unit: 'g',
        },
        {
          name: 'Garlic powder',
          amount: 0.5,
          unit: 'tsp',
        },
        {
          name: 'Smoked paprika',
          amount: 0.25,
          unit: 'tsp',
        },
        {
          name: 'Honey',
          amount: 5,
          unit: 'g',
          optional: true,
        },
        {
          name: 'Salt',
          amount: null,
          unit: 'to taste',
          optional: true,
        },
      ],
      marinationMinutes: {
        min: 20,
        max: 120,
      },
      notes:
        "Use a vinegar-based hot sauce such as Frank's RedHot Original. Reserve a separate clean portion of sauce for coating the cooked chicken.",
      ui: {
        category: 'Spicy',
        accentColor: '#aa3d23',
        image: 'recipe-cards/Buffalo Style.png',
      },
    },
    {
      id: 19,
      name: 'Coconut Lime',
      flavor: 'Creamy, citrusy, mildly spicy',
      region: 'Southeast Asian-inspired',
      ingredients: [
        {
          name: 'Coconut milk',
          amount: 80,
          unit: 'ml',
        },
        {
          name: 'Lime juice',
          amount: 15,
          unit: 'ml',
        },
        {
          name: 'Lime zest',
          amount: 1,
          unit: 'tsp',
        },
        {
          name: 'Fresh ginger',
          amount: 10,
          unit: 'g',
        },
        {
          name: 'Garlic',
          amount: 2,
          unit: 'cloves',
        },
        {
          name: 'Chili flakes',
          amount: 0.25,
          unit: 'tsp',
        },
        {
          name: 'Salt',
          amount: 4,
          unit: 'g',
        },
      ],
      marinationMinutes: {
        min: 60,
        max: 240,
      },
      notes:
        'Shake or stir the coconut milk thoroughly before measuring. Remove excess marinade before grilling.',
      ui: {
        category: 'Savory',
        accentColor: '#72502c',
        image: 'recipe-cards/Coconut Lime.png',
      },
    },
    {
      id: 20,
      name: 'Ranch Buttermilk',
      flavor: 'Creamy, tangy, herby',
      region: 'American',
      ingredients: [
        {
          name: 'Buttermilk or kefir',
          amount: 100,
          unit: 'ml',
        },
        {
          name: 'Dried dill',
          amount: 1,
          unit: 'tsp',
        },
        {
          name: 'Dried parsley',
          amount: 1,
          unit: 'tsp',
        },
        {
          name: 'Garlic powder',
          amount: 1,
          unit: 'tsp',
        },
        {
          name: 'Black pepper',
          amount: 0.5,
          unit: 'tsp',
        },
        {
          name: 'Lemon juice',
          amount: 5,
          unit: 'ml',
        },
        {
          name: 'Salt',
          amount: 4,
          unit: 'g',
        },
      ],
      marinationMinutes: {
        min: 120,
        max: 480,
      },
      notes: 'Let excess buttermilk drip off before grilling for better browning.',
      ui: {
        category: 'Herby',
        accentColor: '#547034',
        image: 'recipe-cards/Ranch Buttermilk.png',
      },
    },
  ],
};

export const recipes = chickenGrimoire.recipes.map((recipe) => ({
  ...recipe,
  comment: recipeComments.find((entry) => entry.id === recipe.id)?.comment ?? '',
}));
