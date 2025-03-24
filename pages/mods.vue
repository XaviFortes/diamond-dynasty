<template>
  <div>
    <div class="text-center mb-12">
      <h1 class="text-4xl font-bold mb-4">{{ $t('mods.title') }}</h1>
      <p class="text-xl text-gray-400 max-w-3xl mx-auto">
        {{ $t('mods.subtitle') }}
      </p>
    </div>

    <!-- Top 9 Featured Mods -->
    <section class="mb-16">
      <h2 class="text-2xl font-bold mb-6 border-l-4 border-blue-500 pl-4">{{ $t('mods.featured_title') }}</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div v-for="mod in featuredMods" :key="mod.id" 
          class="bg-stone-800 rounded-lg overflow-hidden hover:bg-stone-700 transition transform hover:scale-105 shadow-lg">
          <div class="h-48 bg-gradient-to-tr from-blue-900 to-stone-900 flex items-center justify-center overflow-hidden">
            <img v-if="mod.image" :src="mod.image" :alt="mod.name" class="w-full h-full object-cover" />
            <div v-else class="text-8xl opacity-30">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-24 w-24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
          </div>
          <div class="p-6">
            <div class="flex justify-between items-start mb-2">
              <h3 class="text-xl font-bold">{{ mod.name }}</h3>
              <span v-if="mod.category" class="bg-blue-500 text-xs py-1 px-2 rounded-full">{{ $t(`mods.categories.${mod.category}`) }}</span>
            </div>
            <p class="text-gray-400 mb-4 h-12 line-clamp-2">{{ mod.description || $t('mods.no_description') }}</p>
            <div class="flex items-center justify-between">
              <span v-if="mod.author" class="text-xs text-gray-500">{{ $t('mods.by') }} {{ mod.author }}</span>
              <a :href="mod.link" target="_blank" rel="noopener noreferrer" 
                class="text-blue-400 hover:text-blue-300 transition flex items-center">
                <span>{{ $t('mods.learn_more') }}</span>
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>

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
      <div class="mt-4 flex justify-between items-center">
        <div class="text-gray-400 text-sm">
          {{ filteredAllMods.length }} {{ $t('mods.results_found') }}
        </div>
        <div>
          <button @click="showAllMods = !showAllMods" class="text-blue-400 hover:text-blue-300 text-sm underline">
            {{ showAllMods ? $t('mods.show_less') : $t('mods.show_all') }}
          </button>
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
        <div class="h-32 bg-gradient-to-tr from-stone-800 to-stone-900 flex items-center justify-center overflow-hidden">
          <img v-if="mod.image" :src="mod.image" :alt="mod.name" class="w-full h-full object-cover" />
        </div>
        <div class="p-4">
          <div class="flex flex-wrap justify-between items-start mb-2">
            <h3 class="text-lg font-bold">{{ mod.name }}</h3>
            <span v-if="mod.category" class="bg-blue-500 text-xs py-1 px-2 rounded-full mt-1">{{ $t(`mods.categories.${mod.category}`) }}</span>
          </div>
          <div v-if="mod.author" class="text-xs text-gray-500 mb-2">{{ $t('mods.by') }} {{ mod.author }}</div>
          <a 
            :href="mod.link" 
            target="_blank" 
            rel="noopener noreferrer" 
            class="text-blue-400 hover:text-blue-300 transition flex items-center text-sm"
          >
            <span>{{ $t('mods.learn_more') }}</span>
            <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
          <span class="font-medium text-white">Connect to our server</span> - Add our server address: diamondynasty.kratoshost.com
        </li>
      </ol>
      <div class="mt-6">
        <a href="https://legacy.curseforge.com/minecraft/modpacks/diamond-dynasty-2" 
           class="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-lg inline-block transition transform hover:scale-105">
          Download Modpack
        </a>
      </div>
    </div>

    <!-- Server Status -->
    <div class="mt-16 bg-stone-800 rounded-lg p-8 max-w-lg mx-auto">
      <h2 class="text-2xl font-bold mb-4 text-center">{{ $t('serverStatus.title') }}</h2>
      <ServerStatus :show-last-updated="true" />
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';

// State for filters and view control
const searchQuery = ref('');
const selectedCategory = ref('');
const showAllMods = ref(false);

// Featured mods - these are your top picks that will show at the top
const featuredMods = [
  {
    id: 1,
    name: 'Create',
    category: 'tech',
    description: 'A mod about rotational force, mechanical contraptions, and automation.',
    image: '/images/mods/create.jpg',
    link: 'https://www.curseforge.com/minecraft/mc-mods/create',
    author: 'simibubi'
  },
  {
    id: 2,
    name: 'Botania',
    category: 'magic',
    description: 'A tech mod themed around natural magic using flowers.',
    image: '/images/mods/botania.png',
    link: 'https://www.curseforge.com/minecraft/mc-mods/botania',
    author: 'Vazkii'
  },
  {
    id: 3,
    name: 'Tinkers Construct',
    category: 'tech',
    description: 'A mod that allows you to create custom tools and weapons.',
    image: '/images/mods/tinkers-construct.png',
    link: 'https://www.curseforge.com/minecraft/mc-mods/tinkers-construct',
    author: 'mDiyo'
  },
  {
    id: 4,
    name: 'Regions Unexplored',
    category: 'adventure',
    description: 'Adds fascinating biomes and worldgen features to Minecraft.',
    image: '/images/mods/default.jpg',
    link: 'https://www.curseforge.com/minecraft/mc-mods/regions-unexplored',
    author: 'UHQ_GAMES'
  },
  {
    id: 5,
    name: 'Alex\'s Mobs',
    category: 'adventure',
    description: 'Adds a variety of unique creatures to Minecraft.',
    image: '/images/mods/default.jpg',
    link: 'https://www.curseforge.com/minecraft/mc-mods/alexs-mobs',
    author: 'sbom_xela'
  },
  {
    id: 6,
    name: 'Farmer\'s Delight',
    category: 'utility',
    description: 'Expands cooking and farming with new recipes and features.',
    image: '/images/mods/default.jpg',
    link: 'https://www.curseforge.com/minecraft/mc-mods/farmers-delight',
    author: 'vectorwing'
  },
  {
    id: 7,
    name: 'Mekanism',
    category: 'tech',
    description: 'Advanced technology and machinery with power generation.',
    image: '/images/mods/default.jpg',
    link: 'https://www.curseforge.com/minecraft/mc-mods/mekanism',
    author: 'bradyaidanc'
  },
  {
    id: 8,
    name: 'The Twilight Forest',
    category: 'adventure',
    description: 'A mysterious new dimension filled with forests and adventure.',
    image: '/images/mods/default.jpg',
    link: 'https://www.curseforge.com/minecraft/mc-mods/the-twilight-forest',
    author: 'Benimatic'
  },
  {
    id: 9,
    name: 'JEI - Just Enough Items',
    category: 'utility',
    description: 'View all items and recipes with this essential utility.',
    image: '/images/mods/default.jpg',
    link: 'https://www.curseforge.com/minecraft/mc-mods/jei',
    author: 'mezz'
  }
];

// Categories for filtering
const categories = ['tech', 'magic', 'adventure', 'decoration', 'utility', 'optimization'];

// All mods converted from the modlist.html
const allMods = ref([]);

// Parse mods from HTML list
onMounted(async () => {
  try {
    const response = await fetch('/modlist.json');
    allMods.value = await response.json();
  } catch (error) {
    console.error('Failed to load mods list:', error);
    // Fallback to sample data if JSON fetch fails
    allMods.value = [
      // Your original sample mods list can go here as fallback
    ];
  }
});

// Filter all mods
const filteredAllMods = computed(() => {
  return allMods.value.filter(mod => {
    const matchesSearch = mod.name.toLowerCase().includes(searchQuery.value.toLowerCase());
    const matchesCategory = !selectedCategory.value || mod.category === selectedCategory.value;
    return matchesSearch && matchesCategory;
  });
});

// Limited or full list based on showAllMods toggle
const filteredMods = computed(() => {
  const modsToUse = showAllMods.value ? filteredAllMods.value : filteredAllMods.value.slice(0, 24);
  return modsToUse;
});

const resetFilters = () => {
  searchQuery.value = '';
  selectedCategory.value = '';
};
</script>

<style>
/* Optional - add for truncating long descriptions */
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2; /* Standard property for compatibility */
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>