<template>
    <div>
        <!-- Hero section -->
        <div class="relative h-[600px] -mt-10 mb-16">
            <div class="absolute inset-0">
                <!-- <img src="/images/hero-bg.jpg" alt="Diamond Dynasty" class="w-full h-full object-cover" /> -->
                <div class="absolute inset-0 bg-gradient-to-b from-stone-900/80 to-stone-900/100"></div>
            </div>
            <div class="relative container mx-auto px-4 h-full flex items-center">
                <div class="max-w-2xl">
                    <h1 class="text-5xl font-bold mb-4">
                        {{ $t('home.hero.title') }} <span class="text-blue-400">Dynasty</span>
                    </h1>
                    <p class="text-xl text-gray-300 mb-8">
                        {{ $t('home.hero.subtitle') }}
                    </p>
                    <div class="flex flex-wrap gap-4">
                        <NuxtLink :to="localePath('/join')"
                            class="bg-blue-600 hover:bg-blue-700 text-white py-3 px-8 rounded-lg flex items-center transition">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                            {{ $t('home.hero.join_button') }}
                        </NuxtLink>
                        <a href="https://discord.gg/gwu5S9yVJG"
                            class="bg-stone-700 hover:bg-stone-600 text-white py-3 px-8 rounded-lg flex items-center transition">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor"
                                class="mr-2" viewBox="0 0 16 16">
                                <path
                                    d="M13.545 2.907a13.2 13.2 0 0 0-3.257-1.011.05.05 0 0 0-.052.025c-.141.25-.297.577-.406.833a12.2 12.2 0 0 0-3.658 0 8 8 0 0 0-.412-.833.05.05 0 0 0-.052-.025c-1.125.194-2.22.534-3.257 1.011a.04.04 0 0 0-.021.018C.356 6.024-.213 9.047.066 12.032q.003.022.021.037a13.3 13.3 0 0 0 3.995 2.02.05.05 0 0 0 .056-.019q.463-.63.818-1.329a.05.05 0 0 0-.01-.059l-.018-.011a9 9 0 0 1-1.248-.595.05.05 0 0 1-.02-.066l.015-.019q.127-.095.248-.195a.05.05 0 0 1 .051-.007c2.619 1.196 5.454 1.196 8.041 0a.05.05 0 0 1 .053.007q.121.1.248.195a.05.05 0 0 1-.004.085 8 8 0 0 1-1.249.594.05.05 0 0 0-.03.03.05.05 0 0 0 .003.041c.24.465.515.909.817 1.329a.05.05 0 0 0 .056.019 13.2 13.2 0 0 0 4.001-2.02.05.05 0 0 0 .021-.037c.334-3.451-.559-6.449-2.366-9.106a.03.03 0 0 0-.02-.019m-8.198 7.307c-.789 0-1.438-.724-1.438-1.612s.637-1.613 1.438-1.613c.807 0 1.45.73 1.438 1.613 0 .888-.637 1.612-1.438 1.612m5.316 0c-.788 0-1.438-.724-1.438-1.612s.637-1.613 1.438-1.613c.807 0 1.451.73 1.438 1.613 0 .888-.631 1.612-1.438 1.612" />
                            </svg>
                            {{ $t('home.hero.discord_button') }}
                        </a>
                    </div>
                </div>
            </div>
        </div>

        <!-- Features section -->
        <div class="py-12">
            <div class="text-center mb-16">
                <h2 class="text-3xl font-bold mb-4">{{ $t('home.features.title') }}</h2>
                <p class="text-xl text-gray-400 max-w-3xl mx-auto">
                    {{ $t('home.features.subtitle') }}
                </p>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div v-for="(feature, index) in features" :key="index"
                    class="bg-stone-800 rounded-lg p-6 transition hover:bg-stone-700">
                    <div class="bg-blue-600 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                        <component :is="feature.icon" class="h-6 w-6 text-white" />
                    </div>
                    <h3 class="text-xl font-bold mb-2">{{ $t(feature.title) }}</h3>
                    <p class="text-gray-400">{{ $t(feature.description) }}</p>
                </div>
            </div>
        </div>

        <!-- Server stats -->
        <div class="py-12 bg-stone-800 my-16 rounded-lg">
            <div class="container mx-auto px-4">
                <div class="text-center mb-12">
                    <h2 class="text-3xl font-bold mb-4">{{ $t('home.stats.title') }}</h2>
                    <p class="text-xl text-gray-400 max-w-3xl mx-auto">
                        {{ $t('home.stats.subtitle') }}
                    </p>
                </div>

                <div class="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                    <div>
                        <div class="text-4xl font-bold text-blue-400 mb-2">300+</div>
                        <div class="text-lg">{{ $t('home.stats.mods') }}</div>
                    </div>
                    <div>
                        <div class="text-4xl font-bold text-blue-400 mb-2">10+</div>
                        <div class="text-lg">{{ $t('home.stats.players') }}</div>
                    </div>
                    <div>
                        <div class="text-4xl font-bold text-blue-400 mb-2">99.9%</div>
                        <div class="text-lg">{{ $t('home.stats.uptime') }}</div>
                    </div>
                    <div>
                        <div class="text-4xl font-bold text-blue-400 mb-2">24/7</div>
                        <div class="text-lg">{{ $t('home.stats.support') }}</div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Gallery section -->
        <!-- <div class="py-12">
      <div class="text-center mb-16">
        <h2 class="text-3xl font-bold mb-4">{{ $t('home.gallery.title') }}</h2>
        <p class="text-xl text-gray-400 max-w-3xl mx-auto">
          {{ $t('home.gallery.subtitle') }}
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div v-for="i in 6" :key="i" class="relative group overflow-hidden rounded-lg">
          <img :src="`/images/gallery-${i}.jpg`" :alt="`Gallery image ${i}`" class="w-full h-64 object-cover transition-transform group-hover:scale-110" />
          <div class="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition flex items-end p-4">
            <span class="text-white font-bold">{{ $t(`home.gallery.captions.${i}`) }}</span>
          </div>
        </div>
      </div>
    </div> -->

        <!-- CTA section -->
        <div class="py-16 bg-stone-800 rounded-lg my-16">
            <div class="text-center">
                <h2 class="text-3xl font-bold mb-4">{{ $t('home.cta.title') }}</h2>
                <p class="text-xl text-gray-400 max-w-3xl mx-auto mb-8">
                    {{ $t('home.cta.subtitle') }}
                </p>
                <NuxtLink :to="localePath('/join')"
                    class="bg-blue-600 hover:bg-blue-700 text-white py-3 px-8 rounded-lg inline-flex items-center transition">
                    {{ $t('home.cta.button') }}
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24"
                        stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                </NuxtLink>
            </div>
        </div>
    </div>
</template>

<script setup>
import { h } from 'vue';

const localePath = useLocalePath();

// Define feature icons as render functions
const icons = {
    mods: (props) => h('svg', { ...props, xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor" },
        [h('path', { 'stroke-linecap': "round", 'stroke-linejoin': "round", 'stroke-width': "2", d: "M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" })]),

    community: (props) => h('svg', { ...props, xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor" },
        [h('path', { 'stroke-linecap': "round", 'stroke-linejoin': "round", 'stroke-width': "2", d: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" })]),

    events: (props) => h('svg', { ...props, xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor" },
        [h('path', { 'stroke-linecap': "round", 'stroke-linejoin': "round", 'stroke-width': "2", d: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" })]),
};

const features = [
    {
        icon: icons.mods,
        title: 'home.features.items.mods.title',
        description: 'home.features.items.mods.description'
    },
    {
        icon: icons.community,
        title: 'home.features.items.community.title',
        description: 'home.features.items.community.description'
    },
    {
        icon: icons.events,
        title: 'home.features.items.events.title',
        description: 'home.features.items.events.description'
    }
];
</script>