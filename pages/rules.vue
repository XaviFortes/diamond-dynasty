<template>
  <div>
    <div class="text-center mb-12">
      <h1 class="text-4xl font-bold mb-4">Server Rules</h1>
      <p class="text-xl text-gray-400 max-w-3xl mx-auto">
        To ensure everyone has a great experience, please follow these rules while playing on Diamond Dynasty.
      </p>
    </div>

    <div class="max-w-4xl mx-auto">
      <!-- Rule Categories -->
      <div class="mb-10 flex justify-center space-x-4 overflow-x-auto pb-2">
        <a 
          v-for="(category, index) in categories" 
          :key="index"
          :href="`#${category.id}`"
          class="px-4 py-2 bg-stone-800 rounded-lg text-blue-400 hover:bg-stone-700 transition scroll-smooth"
        >
          {{ category.name }}
        </a>
      </div>

      <!-- Rules List -->
      <div class="space-y-16">
        <div 
          v-for="(category, index) in categories" 
          :key="index" 
          :id="category.id"
          class="scroll-mt-20"
        >
          <div class="flex items-center mb-6">
            <div class="p-4 rounded-lg bg-blue-500 bg-opacity-20 mr-4">
              <component :is="category.icon" class="h-8 w-8 text-blue-400"></component>
            </div>
            <h2 class="text-2xl font-bold">{{ category.name }}</h2>
          </div>

          <div class="space-y-6">
            <div 
              v-for="(rule, ruleIndex) in category.rules" 
              :key="ruleIndex" 
              class="bg-stone-800 rounded-lg p-6"
            >
              <div class="flex items-start">
                <div class="bg-blue-500 bg-opacity-10 text-blue-400 rounded-full h-8 w-8 flex items-center justify-center font-bold mr-4">
                  {{ ruleIndex + 1 }}
                </div>
                <div>
                  <h3 class="text-xl font-bold mb-2">{{ rule.title }}</h3>
                  <p class="text-gray-300">{{ rule.description }}</p>
                  
                  <div v-if="rule.examples" class="mt-4 bg-stone-900 rounded p-4">
                    <h4 class="font-bold text-gray-300 mb-2">Examples:</h4>
                    <ul class="list-disc pl-5 space-y-1 text-gray-400">
                      <li v-for="(example, i) in rule.examples" :key="i">{{ example }}</li>
                    </ul>
                  </div>
                  
                  <div v-if="rule.penalty" class="mt-4 text-sm">
                    <span class="text-red-400 font-bold">Penalty: </span>
                    <span class="text-gray-300">{{ rule.penalty }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Appeal Process -->
      <div class="mt-16 bg-stone-800 rounded-lg p-8">
        <h2 class="text-2xl font-bold mb-4">Ban Appeal Process</h2>
        <p class="text-gray-300 mb-4">
          If you believe you were incorrectly banned or would like to appeal a ban, you can submit an appeal through our Discord server.
        </p>
        
        <ol class="list-decimal list-inside space-y-2 text-gray-300">
          <li>Join our Discord server if you haven't already</li>
          <li>Go to the #ban-appeals channel</li>
          <li>Follow the format provided in the pinned message</li>
          <li>Wait for a staff member to review your appeal</li>
        </ol>

        <div class="mt-6">
          <a href="#" class="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-lg inline-block transition transform hover:scale-105">
            Join Our Discord
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const GeneralIcon = {
  template: `
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
    </svg>
  `
};

const ChatIcon = {
  template: `
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
    </svg>
  `
};

const BuildingIcon = {
  template: `
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
    </svg>
  `
};

const EconomyIcon = {
  template: `
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  `
};

const categories = [
  {
    id: 'general',
    name: 'General Rules',
    icon: GeneralIcon,
    rules: [
      {
        title: 'Respect All Players',
        description: 'Treat all players with respect. No harassment, discrimination, or bullying is tolerated.',
        examples: [
          'No racist, sexist, or homophobic comments',
          'Don\'t personally attack other players',
          'Respect others\' opinions and playstyles'
        ],
        penalty: 'Warning to permanent ban depending on severity'
      },
      {
        title: 'No Hacking or Cheating',
        description: 'Use of hacked clients, exploits, duplication glitches, or any unfair advantage is strictly prohibited.',
        examples: [
          'No X-ray texture packs or mods',
          'No auto-clickers or macros',
          'No using bugs to duplicate items'
        ],
        penalty: 'Temporary to permanent ban'
      },
      {
        title: 'Follow Staff Instructions',
        description: 'Server staff have the final say in disputes. Follow their instructions when given.',
        penalty: 'Warning to temporary ban'
      }
    ]
  },
  {
    id: 'chat',
    name: 'Chat Rules',
    icon: ChatIcon,
    rules: [
      {
        title: 'No Spamming',
        description: 'Don\'t flood the chat with repeated messages or excessive capitalization.',
        examples: [
          'Sending the same message multiple times',
          'Using all caps for entire sentences',
          'Excessive emojis or symbols'
        ],
        penalty: 'Mute (duration increases with repeat offenses)'
      },
      {
        title: 'Keep Chat Family-Friendly',
        description: 'No explicit, adult, or overly inappropriate content in public channels.',
        penalty: 'Warning to mute or ban depending on severity'
      },
      {
        title: 'No Advertising',
        description: 'Don\'t advertise other servers, websites, or services unrelated to Diamond Dynasty.',
        examples: [
          'Posting IP addresses to other servers',
          'Sharing links to unrelated websites',
          'Promoting services for real money'
        ],
        penalty: 'Warning to temporary ban'
      }
    ]
  },
  {
    id: 'building',
    name: 'Building & Land Rules',
    icon: BuildingIcon,
    rules: [
      {
        title: 'Respect Claimed Land',
        description: 'Don\'t build on, mine in, or otherwise interfere with land claimed by other players without permission.',
        penalty: 'Warning to temporary ban and rollback of changes'
      },
      {
        title: 'No Offensive Builds',
        description: 'Don\'t create structures that are explicit, offensive, or inappropriate.',
        penalty: 'Warning to ban and removal of build'
      },
      {
        title: 'No Claim Hogging',
        description: 'Don\'t claim excessive amounts of land that you don\'t plan to use.',
        examples: [
          'Claiming large areas just to prevent others from building nearby',
          'Abandoning claimed areas without releasing the claim',
          'Creating "claim walls" to isolate parts of the map'
        ],
        penalty: 'Warning and potential removal of excessive claims'
      }
    ]
  },
  {
    id: 'economy',
    name: 'Economy Rules',
    icon: EconomyIcon,
    rules: [
      {
        title: 'No Scamming',
        description: 'All trades must be honest. Don\'t mislead players about items or services.',
        examples: [
          'Promising items and not delivering',
          'Misrepresenting the quality or enchantments of items',
          'Taking payment for services you don\'t provide'
        ],
        penalty: 'Warning to ban depending on severity'
      },
      {
        title: 'No Real Money Transactions',
        description: 'Trading in-game items or services for real-world money is not allowed.',
        penalty: 'Temporary to permanent ban'
      },
      {
        title: 'No Market Manipulation',
        description: 'Don\'t artificially inflate prices by hoarding resources or coordinating with others to control markets.',
        penalty: 'Warning to temporary ban and possible confiscation of items'
      }
    ]
  }
];
</script>