<template>
  <div>
    <div class="text-center mb-12">
      <h1 class="text-4xl font-bold mb-4">{{ $t('mods.title') }}</h1>
      <p class="text-xl text-gray-400 max-w-3xl mx-auto">
        {{ $t('mods.subtitle') }}
      </p>
    </div>

    <!-- Search and filter -->
    <div class="bg-stone-800 p-6 rounded-lg mb-10">
      <div class="flex flex-col md:flex-row gap-4">
        <div class="flex-grow">
          <label for="search" class="sr-only">Search</label>
          <div class="relative">
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input 
              id="search" 
              v-model="searchQuery" 
              type="text" 
              :placeholder="$t('mods.search')" 
              class="bg-stone-700 text-white w-full pl-10 pr-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>
        </div>
        <div class="flex-shrink-0 w-full md:w-1/4">
          <label for="category" class="sr-only">Category</label>
          <select 
            id="category" 
            v-model="selectedCategory" 
            class="bg-stone-700 text-white w-full px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
          >
            <option value="">{{ $t('mods.all_categories') }}</option>
            <option v-for="category in categories" :key="category" :value="category">
              {{ $t(`mods.categories.${category}`) }}
            </option>
          </select>
        </div>
      </div>
    </div>

    <!-- Mod list -->
    <div v-if="filteredMods.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div 
        v-for="mod in filteredMods" 
        :key="mod.id" 
        class="bg-stone-800 rounded-lg overflow-hidden hover:bg-stone-700 transition"
      >
        <img :src="mod.image" :alt="mod.name" class="w-full h-48 object-cover" />
        <div class="p-6">
          <div class="flex justify-between items-start mb-2">
            <h3 class="text-xl font-bold">{{ mod.name }}</h3>
            <span class="bg-blue-500 text-xs py-1 px-2 rounded-full">{{ $t(`mods.categories.${mod.category}`) }}</span>
          </div>
          <p class="text-gray-400 mb-4">{{ mod.description }}</p>
          <a 
            :href="mod.link" 
            target="_blank" 
            rel="noopener noreferrer" 
            class="text-blue-400 hover:text-blue-300 transition flex items-center"
          >
            <span>{{ $t('mods.learn_more') }}</span>
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </div>
      </div>
    </div>

    <!-- No results -->
    <div v-else class="bg-stone-800 p-8 rounded-lg text-center">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 mx-auto text-gray-600 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <h3 class="text-xl font-bold mb-2">{{ $t('mods.no_results.title') }}</h3>
      <p class="text-gray-400 mb-4">{{ $t('mods.no_results.text') }}</p>
      <button 
        @click="resetFilters" 
        class="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition"
      >
        {{ $t('mods.no_results.button') }}
      </button>
    </div>

    <!-- How to Install -->
    <div class="mt-16 bg-stone-800 rounded-lg p-8 max-w-4xl mx-auto">
      <h2 class="text-2xl font-bold mb-4">How to Install Our Modpack</h2>
      <ol class="list-decimal list-inside space-y-4 text-gray-300">
        <li>
          <span class="font-medium text-white">Download the launcher</span> - We recommend using either the CurseForge App or the ATLauncher.
        </li>
        <li>
          <span class="font-medium text-white">Search for "Diamond Dynasty"</span> - Find our modpack in the launcher's search.
        </li>
        <li>
          <span class="font-medium text-white">Install the pack</span> - Click install and wait for the download to complete.
        </li>
        <li>
          <span class="font-medium text-white">Launch the game</span> - Open the pack and click play to start.
        </li>
        <li>
          <span class="font-medium text-white">Connect to our server</span> - Add our server address: play.diamonddynasty.net
        </li>
      </ol>
      <div class="mt-6">
        <a href="https://legacy.curseforge.com/minecraft/modpacks/diamond-dynasty-2" class="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-lg inline-block transition transform hover:scale-105">
          Download Modpack
        </a>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const searchQuery = ref('');
const selectedCategory = ref('');

const categories = ['tech', 'magic', 'adventure', 'decoration', 'utility', 'optimization'];

// Sample mod data - in a real app, you might fetch this from an API
const mods = [
  {
    id: 1,
    name: 'Applied Energistics 2',
    category: 'tech',
    description: 'A mod that focuses on item storage and crafting automation.',
    image: '/images/mods/applied-energistics.jpg',
    link: 'https://www.curseforge.com/minecraft/mc-mods/applied-energistics-2'
  },
  {
    id: 2,
    name: 'Botania',
    category: 'magic',
    description: 'A tech mod themed around natural magic using flowers.',
    image: '/images/mods/botania.jpg',
    link: 'https://www.curseforge.com/minecraft/mc-mods/botania'
  },
  {
    id: 3,
    name: 'Create',
    category: 'tech',
    description: 'A mod about rotational force, mechanical contraptions, and automation.',
    image: '/images/mods/create.jpg',
    link: 'https://www.curseforge.com/minecraft/mc-mods/create'
  },
  {
    id: 4,
    name: 'Biomes O\' Plenty',
    category: 'adventure',
    description: 'Adds over 90 new biomes to enhance world generation.',
    image: '/images/mods/biomes-o-plenty.jpg',
    link: 'https://www.curseforge.com/minecraft/mc-mods/biomes-o-plenty'
  },
  {
    id: 5,
    name: 'Chisel',
    category: 'decoration',
    description: 'Adds a wide variety of decorative blocks to the game.',
    image: '/images/mods/chisel.jpg',
    link: 'https://www.curseforge.com/minecraft/mc-mods/chisel'
  },
  {
    id: 6,
    name: 'JourneyMap',
    category: 'utility',
    description: 'Real-time mapping in-game or in a web browser as you explore.',
    image: '/images/mods/journeymap.jpg',
    link: 'https://www.curseforge.com/minecraft/mc-mods/journeymap'
  },
  {
    id: 7,
    name: 'OptiFine',
    category: 'optimization',
    description: 'Improves Minecraft performance and adds support for HD textures.',
    image: '/images/mods/optifine.jpg',
    link: 'https://www.optifine.net/'
  },
  {
    id: 8,
    name: 'Thaumcraft',
    category: 'magic',
    description: 'A magical mod that allows you to draw magical energy from objects.',
    image: '/images/mods/thaumcraft.jpg',
    link: 'https://www.curseforge.com/minecraft/mc-mods/thaumcraft'
  },
  {
    id: 9,
    name: 'Tinkers\' Construct',
    category: 'tech',
    description: 'A mod that allows you to create custom tools and weapons.',
    image: '/images/mods/tinkers-construct.jpg',
    link: 'https://www.curseforge.com/minecraft/mc-mods/tinkers-construct'
  }
];

const filteredMods = computed(() => {
  return mods.filter(mod => {
    const matchesSearch = mod.name.toLowerCase().includes(searchQuery.value.toLowerCase()) || 
                         mod.description.toLowerCase().includes(searchQuery.value.toLowerCase());
    const matchesCategory = !selectedCategory.value || mod.category === selectedCategory.value;
    return matchesSearch && matchesCategory;
  });
});

const resetFilters = () => {
  searchQuery.value = '';
  selectedCategory.value = '';
};
</script>