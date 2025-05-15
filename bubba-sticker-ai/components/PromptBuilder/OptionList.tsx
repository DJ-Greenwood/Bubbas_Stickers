// Options for the Prompt Builder dropdowns
export const promptOptions = {
  type: [
    'Character', 
    'Animal', 
    'Object', 
    'Scene',
    'Food',
    'Plant',
    'Vehicle',
    'Monster',
    'Robot',
    'Superhero',
    'Logo'
  ],

  style: [
    'Cute', 
    'Minimalist', 
    'Grunge', 
    'Hyper-realistic',
    'Cartoon',
    'Anime',
    'Pixel Art',
    'Retro',
    'Vaporwave',
    'Cyberpunk',
    'Pop Art',
    'Watercolor',
    'Sketch',
    'Glitch',
    'Neon',
    'Geometric',
    'Abstract',
    'Vintage'
  ],

  genre: [
    'Fantasy', 
    'Sci-fi', 
    'Slice-of-life', 
    'Cyberpunk',
    'Steampunk',
    'Horror',
    'Comedy',
    'Romance',
    'Historical',
    'Western',
    'Film Noir',
    'Superhero',
    'Magical Realism',
    'Post-Apocalyptic'
  ],

  medium: [
    'Watercolor', 
    'Digital Painting', 
    'Pencil Sketch', 
    '3D Render',
    'Oil Painting',
    'Ink Drawing',
    'Acrylic',
    'Pastel',
    'Marker',
    'Crayon',
    'Collage',
    'Stained Glass',
    'Woodcut',
    'Vector Art',
    'Photography',
    'Clay Sculpture'
  ],

  context: [
    'Wearing sunglasses', 
    'Standing in the rain', 
    'Surrounded by stars',
    'In a forest',
    'On a beach',
    'In space',
    'Underwater',
    'On a mountain',
    'At night',
    'In the city',
    'With a rainbow background',
    'During sunset',
    'In the desert',
    'With flowers',
    'With food',
    'On a cloud',
    'In a bubble',
    'Holding a sign',
    'With sparkles',
    'Flying'
  ],

  resolution: [
    '1024x1024', 
    '1024x1536', 
    '1536x1024',
    '512x512'
  ],

  quality: [
    'Low', 
    'Medium', 
    'High'
  ]
};

// Cost mapping for different quality and resolutions
export const costMatrix = {
  Low: {
    '512x512': 0.005,
    '1024x1024': 0.008,
    '1024x1536': 0.010,
    '1536x1024': 0.010
  },
  Medium: {
    '512x512': 0.018,
    '1024x1024': 0.024,
    '1024x1536': 0.032,
    '1536x1024': 0.032
  },
  High: {
    '512x512': 0.080,
    '1024x1024': 0.120,
    '1024x1536': 0.160,
    '1536x1024': 0.160
  }
};