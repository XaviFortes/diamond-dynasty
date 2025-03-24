<template>
  <div>
    <div class="text-center mb-12">
      <h1 class="text-4xl font-bold mb-4">Server Features</h1>
      <p class="text-xl text-gray-400 max-w-3xl mx-auto">
        Diamond Dynasty offers a rich modded Minecraft experience with features designed for both casual and expert players.
      </p>
    </div>

    <!-- Feature Categories -->
    <div class="flex justify-center mb-10 overflow-x-auto flex-wrap gap-2">
      <button 
        v-for="category in categories" 
        :key="category"
        @click="selectedCategory = category"
        :class="['px-4 py-2 rounded-full transition', 
                 selectedCategory === category 
                   ? 'bg-blue-600 text-white' 
                   : 'bg-stone-800 text-gray-300 hover:bg-stone-700']"
      >
        {{ category }}
      </button>
    </div>

    <!-- Features List -->
    <div class="max-w-6xl mx-auto">
      <div v-for="(feature, index) in filteredFeatures" :key="index" 
           class="mb-12 bg-stone-800 rounded-lg shadow-lg overflow-hidden"
           :class="index % 2 === 0 ? 'md:flex' : 'md:flex md:flex-row-reverse'">
        <div class="md:w-1/2">
          <img :src="feature.image" :alt="feature.title" class="w-full h-full object-cover" />
        </div>
        <div class="p-8 md:w-1/2 flex flex-col justify-center">
          <span class="bg-blue-500 bg-opacity-20 text-blue-400 px-3 py-1 rounded-full text-sm inline-block mb-4">
            {{ feature.category }}
          </span>
          <h3 class="text-2xl font-bold mb-4">{{ feature.title }}</h3>
          <p class="text-gray-300 mb-4">{{ feature.description }}</p>
          <ul class="space-y-2">
            <li v-for="(point, i) in feature.points" :key="i" class="flex items-start">
              <svg class="h-5 w-5 text-blue-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
              <span>{{ point }}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const selectedCategory = ref('All');

const categories = ['All', 'Gameplay', 'Economy', 'Tech', 'Social', 'World'];

const features = [
  {
    title: "Advanced Economy System",
    category: "Economy",
    image: "/images/feature-economy.jpg",
    description: "Our server features a balanced player-driven economy where you can trade resources, items, and services.",
    points: [
      "Player shops with custom storefronts",
      "Server marketplaces in spawn",
      "Virtual currency with anti-inflation measures",
      "Jobs system to earn money through skills"
    ]
  },
  {
    title: "Land Protection",
    category: "World",
    image: "/images/feature-claims.jpg",
    description: "Protect your builds and resources with our comprehensive land claiming system.",
    points: [
      "Chunk-based claiming with visual boundaries",
      "Friend and team permissions system",
      "Protection from griefing and theft",
      "Claim visualization on the map"
    ]
  },
  {
    title: "Tech Progression",
    category: "Tech",
    image: "/images/feature-tech.jpg",
    description: "Progress through multiple technology ages, each unlocking new crafting recipes and abilities.",
    points: [
      "Custom research system",
      "Tech trees spanning stone age to space age",
      "Unique unlockable machines and tools",
      "Balanced progression pacing"
    ]
  },
  {
    title: "Custom World Generation",
    category: "World",
    image: "/images/feature-world.jpg",
    description: "Explore uniquely generated worlds with custom biomes, structures, and resources.",
    points: [
      "Custom structures and dungeons",
      "Rare resource biomes and dimensions",
      "Periodic world events and challenges",
      "Multiple dimensions to explore"
    ]
  },
  {
    title: "Community Tools",
    category: "Social",
    image: "/images/feature-community.jpg",
    description: "Connect with other players through our robust community features.",
    points: [
      "Teams/factions system with shared claims",
      "In-game mail system",
      "Community event calendar",
      "Achievements and leaderboards"
    ]
  },
  {
    title: "Custom Enchantments",
    category: "Gameplay",
    image: "/images/feature-enchant.jpg",
    description: "Discover and use powerful custom enchantments that go beyond vanilla Minecraft.",
    points: [
      "50+ unique enchantments",
      "Special enchantment crafting system",
      "Tiered enchantment rarity",
      "Enchantment combinations with special effects"
    ]
  }
];

const filteredFeatures = computed(() => {
  if (selectedCategory === 'All') {
    return features;
  }
  return features.filter(feature => feature.category === selectedCategory);
});
</script>