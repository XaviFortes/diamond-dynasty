<template>
  <div class="min-h-screen bg-stone-900 text-white">
    <!-- Navigation header -->
    <header class="bg-stone-800 shadow-lg">
      <div class="container mx-auto px-4 py-4">
        <div class="flex items-center justify-between">
          <NuxtLink to="/" class="flex items-center space-x-3">
            <img src="/images/logo.png" alt="Diamond Dynasty Logo" class="h-10 w-10" />
            <span class="font-bold text-xl">Diamond Dynasty</span>
          </NuxtLink>

          <div class="flex items-center space-x-6">
            <!-- Main navigation -->
            <nav class="hidden md:flex items-center space-x-6">
              <NuxtLink 
                v-for="(link, index) in navLinks" 
                :key="index" 
                :to="localePath(link.route)" 
                class="hover:text-blue-400 transition"
              >
                {{ $t(link.label) }}
              </NuxtLink>
            </nav>

            <!-- Language switcher -->
            <div class="relative group">
              <button class="flex items-center space-x-1 hover:text-blue-400 transition">
                <span>{{ currentLocaleDisplay }}</span>
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div class="absolute right-0 mt-2 py-2 w-32 bg-stone-700 rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
                <NuxtLink 
                  v-for="locale in availableLocales" 
                  :key="locale.code"
                  :to="switchLocalePath(locale.code)"
                  class="block px-4 py-2 hover:bg-stone-600 transition"
                >
                  {{ locale.name }}
                </NuxtLink>
              </div>
            </div>

            <!-- Mobile menu button -->
            <button @click="mobileMenuOpen = !mobileMenuOpen" class="md:hidden text-white focus:outline-none">
              <svg v-if="!mobileMenuOpen" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        <!-- Mobile navigation -->
        <div v-show="mobileMenuOpen" class="md:hidden mt-4 pb-2">
          <NuxtLink 
            v-for="(link, index) in navLinks" 
            :key="index" 
            :to="localePath(link.route)" 
            class="block py-2 hover:text-blue-400 transition"
            @click="mobileMenuOpen = false"
          >
            {{ $t(link.label) }}
          </NuxtLink>
        </div>
      </div>
    </header>

    <!-- Main content -->
    <main class="container mx-auto px-4 py-10">
      <slot />
    </main>

    <!-- Footer -->
    <footer class="bg-stone-800 py-10 mt-16">
      <div class="container mx-auto px-4">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div class="flex items-center space-x-3 mb-4">
              <img src="/images/logo.png" alt="Diamond Dynasty Logo" class="h-10 w-10" />
              <span class="font-bold text-xl">Diamond Dynasty</span>
            </div>
            <p class="text-gray-400">
              {{ $t('footer.description') }}
            </p>
          </div>

          <div>
            <h3 class="text-lg font-bold mb-4">{{ $t('footer.links') }}</h3>
            <ul class="space-y-2">
              <li v-for="(link, index) in navLinks" :key="index">
                <NuxtLink :to="localePath(link.route)" class="text-gray-400 hover:text-blue-400 transition">
                  {{ $t(link.label) }}
                </NuxtLink>
              </li>
            </ul>
          </div>

          <div>
            <h3 class="text-lg font-bold mb-4">{{ $t('footer.connect') }}</h3>
            <ul class="space-y-2">
              <li>
                <a href="https://discord.gg/gwu5S9yVJG" class="text-gray-400 hover:text-blue-400 transition flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-discord mr-2" viewBox="0 0 16 16">
                    <path d="M13.545 2.907a13.227 13.227 0 0 0-3.257-1.011.05.05 0 0 0-.052.025c-.141.25-.297.577-.406.833a12.19 12.19 0 0 0-3.658 0 8.258 8.258 0 0 0-.412-.833.051.051 0 0 0-.052-.025c-1.125.194-2.22.534-3.257 1.011a.041.041 0 0 0-.021.018C.356 6.024-.213 9.047.066 12.032q.003.033.033.047a13.358 13.358 0 0 0 4.001 2.02.05.05 0 0 0 .054-.019c.355-.48.679-1.003.961-1.536a.051.051 0 0 0-.027-.067 8.376 8.376 0 0 1-1.19-.572.05.05 0 0 1-.013-.084 6.020 6.020 0 0 0 .193-.168.051.051 0 0 1 .052-.01c2.682 1.218 5.586 1.218 8.236 0a.053.053 0 0 1 .053.01c.054.056.135.115.193.168a.05.05 0 0 1-.013.084 7.880 7.880 0 0 1-1.19.572.05.05 0 0 0-.028.067c.284.533.607 1.056.972 1.536a.05.05 0 0 0 .055.019 13.349 13.349 0 0 0 4.001-2.02.05.05 0 0 0 .033-.047c.336-3.473-.724-6.490-3.066-9.146a.039.039 0 0 0-.021-.018" />
                  </svg>
                  Discord
                </a>
              </li>
              <li>
                <a href="#" class="text-gray-400 hover:text-blue-400 transition flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-twitter-x mr-2" viewBox="0 0 16 16">
                    <path d="M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.601.75Zm-.86 13.028h1.36L4.323 2.145H2.865z"/>
                  </svg>
                  Twitter
                </a>
              </li>
              <li>
                <a href="#" class="text-gray-400 hover:text-blue-400 transition flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-reddit mr-2" viewBox="0 0 16 16">
                    <path d="M6.167 8a.83.83 0 0 0-.83.83c0 .459.372.84.83.831a.831.831 0 0 0 0-1.661m1.843 3.647c.315 0 1.403-.038 1.976-.611a.23.23 0 0 0 0-.306.213.213 0 0 0-.306 0c-.353.363-1.126.487-1.67.487-.545 0-1.308-.124-1.671-.487a.213.213 0 0 0-.306 0 .213.213 0 0 0 0 .306c.564.563 1.652.61 1.977.61zm.992-2.807c0 .458.373.83.831.83.458 0 .83-.381.83-.83a.831.831 0 0 0-1.66 0z"/>
                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-3.828-1.165c-.315 0-.602.124-.812.325-.801-.573-1.9-.945-3.121-.993l.534-2.501 1.738.372a.83.83 0 1 0 .83-.869.83.83 0 0 0-.744.468l-1.938-.41a.2.2 0 0 0-.153.028.2.2 0 0 0-.086.134l-.592 2.788c-1.24.038-2.358.41-3.17.992-.21-.2-.496-.324-.81-.324a1.163 1.163 0 0 0-.478 2.224c-.02.115-.029.23-.029.353 0 1.795 2.091 3.256 4.669 3.256s4.668-1.451 4.668-3.256c0-.114-.01-.238-.029-.353.401-.181.688-.592.688-1.069 0-.65-.525-1.165-1.165-1.165z"/>
                  </svg>
                  Reddit
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 class="text-lg font-bold mb-4">{{ $t('footer.server_status') }}</h3>
            <div class="bg-stone-700 p-4 rounded-lg">
              <div class="mb-3 flex items-center">
                <div class="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                <span>{{ $t('footer.online') }}</span>
              </div>
              <div class="text-xl font-bold">24/50</div>
              <div class="text-sm text-gray-400">{{ $t('footer.players_online') }}</div>
            </div>
          </div>
        </div>

        <div class="border-t border-stone-700 mt-8 pt-8 text-center text-gray-400">
          <p>© 2025 Diamond Dynasty. {{ $t('footer.rights') }}</p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const { t, locale } = useI18n();
const { locales } = useI18n();

const mobileMenuOpen = ref(false);

const navLinks = [
  { route: '/', label: 'nav.home' },
  { route: '/mods', label: 'nav.mods' },
  { route: '/join', label: 'nav.join' },
  { route: '/rules', label: 'nav.rules' },
//   { route: '/faq', label: 'nav.faq' }
];

const availableLocales = computed(() => {
    console.log(locales.value);
  return (locales.value || []).map(locale => {
    console.log(locale);
    return {
      code: locale.code,
      name: locale.code === 'en' ? 'English' : locale.code === 'es' ? 'Español' : locale.iso
    };
  });
});

const currentLocaleDisplay = computed(() => {
  return locale.value === 'en' ? 'English' : locale.value === 'es' ? 'Español' : locale.value;
});

const localePath = useLocalePath();
const switchLocalePath = useSwitchLocalePath()
</script>

<style>
@font-face {
  font-family: 'Minecraft';
  src: url('/fonts/Minecraft.ttf') format('truetype');
  font-weight: normal;
  font-style: normal;
}

.font-minecraft {
  font-family: 'Minecraft', sans-serif;
}
</style>