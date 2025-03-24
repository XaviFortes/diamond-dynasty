<template>
  <div>
    <div class="text-center mb-12">
      <h1 class="text-4xl font-bold mb-4">{{ $t('join.title') }}</h1>
      <p class="text-xl text-gray-400 max-w-3xl mx-auto">
        {{ $t('join.subtitle') }}
      </p>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
      <!-- Server Info -->
      <div>
        <div class="bg-stone-800 rounded-lg overflow-hidden">
          <div class="relative h-48">
            <!-- <img src="/images/server-banner.jpg" alt="Server Banner" class="w-full h-full object-cover" /> -->
            <div class="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
              <div class="text-center">
                <h2 class="text-3xl font-bold text-white mb-2">Diamond Dynasty</h2>
                <div class="bg-green-500 px-3 py-1 rounded-full inline-flex items-center">
                  <span class="w-2 h-2 bg-white rounded-full mr-2"></span>
                  <span class="text-white font-medium">{{ $t('join.status.online') }}</span>
                </div>
              </div>
            </div>
          </div>
          
          <div class="p-6">
            <div class="grid grid-cols-2 gap-4 mb-6">
              <div class="bg-stone-700 p-4 rounded-lg text-center">
                <div class="text-2xl font-bold text-blue-400 mb-1">24/50</div>
                <div class="text-sm text-gray-300">{{ $t('join.players_online') }}</div>
              </div>
              <div class="bg-stone-700 p-4 rounded-lg text-center">
                <div class="text-2xl font-bold text-blue-400 mb-1">1.19.2</div>
                <div class="text-sm text-gray-300">{{ $t('join.minecraft_version') }}</div>
              </div>
            </div>

            <div class="mb-6">
              <h3 class="text-lg font-bold mb-2">{{ $t('join.server_address.title') }}</h3>
              <div class="flex">
                <input 
                  type="text" 
                  value="play.diamonddynasty.net" 
                  readonly
                  class="w-full px-4 py-2 bg-stone-700 border border-stone-600 rounded-l-lg focus:outline-none"
                />
                <button 
                  @click="copyServerAddress" 
                  class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-r-lg transition"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                </button>
              </div>
              <div v-if="copySuccess" class="text-sm text-green-400 mt-1">
                {{ $t('join.server_address.copied') }}
              </div>
            </div>

            <div class="mb-6">
              <h3 class="text-lg font-bold mb-2">{{ $t('join.discord.title') }}</h3>
              <a 
                href="https://discord.gg/gwu5S9yVJG" 
                class="bg-indigo-700 hover:bg-indigo-600 text-white py-2 px-4 rounded-lg flex items-center justify-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-discord mr-2" viewBox="0 0 16 16">
                  <path d="M13.545 2.907a13.227 13.227 0 0 0-3.257-1.011.05.05 0 0 0-.052.025c-.141.25-.297.577-.406.833a12.19 12.19 0 0 0-3.658 0 8.258 8.258 0 0 0-.412-.833.051.051 0 0 0-.052-.025c-1.125.194-2.22.534-3.257 1.011a.041.041 0 0 0-.021.018C.356 6.024-.213 9.047.066 12.032q.003.033.033.047a13.358 13.358 0 0 0 4.001 2.02.05.05 0 0 0 .054-.019c.355-.48.679-1.003.961-1.536a.051.051 0 0 0-.027-.067 8.376 8.376 0 0 1-1.19-.572.05.05 0 0 1-.013-.084 6.020 6.020 0 0 0 .193-.168.051.051 0 0 1 .052-.01c2.682 1.218 5.586 1.218 8.236 0a.053.053 0 0 1 .053.01c.054.056.135.115.193.168a.05.05 0 0 1-.013.084 7.880 7.880 0 0 1-1.19.572.05.05 0 0 0-.028.067c.284.533.607 1.056.972 1.536a.05.05 0 0 0 .055.019 13.349 13.349 0 0 0 4.001-2.02.05.05 0 0 0 .033-.047c.336-3.473-.724-6.490-3.066-9.146a.039.039 0 0 0-.021-.018" />
                </svg>
                {{ $t('join.discord.button') }}
              </a>
            </div>

            <!-- <div>
              <h3 class="text-lg font-bold mb-2">{{ $t('join.donation.title') }}</h3>
              <p class="text-gray-300 mb-3">
                {{ $t('join.donation.description') }}
              </p>
              <a 
                href="#" 
                class="bg-stone-700 hover:bg-stone-600 text-white py-2 px-4 rounded-lg flex items-center justify-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {{ $t('join.donation.button') }}
              </a>
            </div> -->
          </div>
        </div>
      </div>

      <!-- Installation Guide -->
      <div>
        <h2 class="text-2xl font-bold mb-6">{{ $t('join.how_to_join') }}</h2>
        
        <div class="space-y-8">
          <div class="bg-stone-800 rounded-lg p-6">
            <div class="flex items-start">
              <div class="bg-blue-500 rounded-full w-8 h-8 flex items-center justify-center text-white font-bold mr-4 mt-1">1</div>
              <div>
                <h3 class="text-xl font-bold mb-2">{{ $t('join.steps.step1.title') }}</h3>
                <p class="text-gray-300 mb-4">
                  {{ $t('join.steps.step1.description') }}
                </p>
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <a href="https://www.curseforge.com/download/app" class="bg-stone-700 p-4 rounded-lg flex items-center hover:bg-stone-600 transition" target="_blank">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 53.5"><path fill="#f16436" fill-rule="evenodd" d="M0 6.9082l27.9532.0756L26.269 0h73.7449l-.0164 8.1433C87.5 10.6348 78.6726 16.775 74.825 36.34H72.046l-1.5815 4.359h2.3079l3.9906 12.8087H37.961l3.9184-12.8086h2.325l-1.6467-4.359h-2.7642l-5.1516-13.7535C13.5203 21.3437 2.6748 16.9042 0 6.9082zM58.6772 39.062c-3.082-5.6216-5.1058-1.197-11.4454-6.9496-2.4727-2.2436-3.4588-8.8199 2.097-10.8301-2.5255 5.5749 4.0297 7.8558 5.5898 4.6685.709-1.4486 1.6039-4.1204-.9798-5.9518-1.392-.9867-1.9281-3.9125-.7364-5.5388.3837 1.2093 1.5938 2.5013 3.916 1.5411-4.9192-8.1404 2.934-10.9457 6.7104-10.5817-3.9686.441-6.025 3.977-4.2196 7.8269 1.15 2.452 2.9006 3.6589 3.4097 5.6657-1.6952.1263-2.1852.9065-2.1495 2.362.0268 1.0895 2.5496 2.6646 2.9494-.4456 1.175 2.4245-.2407 3.8496-1.0129 4.9984-1.7824 2.6515-.1036 5.4107 2.1097 3.3067.9547-.9074 1.6155-2.5812.4048-5.318 2.229 1.776 4.5057 6.5447.9079 10.677-1.756 2.017-6.9514 1.391-7.551 4.5693z"/></svg>
                    <!-- <img src="/images/curseforge-logo.png" alt="CurseForge Logo" class="h-8 w-8 mr-3" /> -->
                    <div>
                      <div class="font-bold">CurseForge</div>
                      <div class="text-xs text-gray-400">{{ $t('join.steps.step1.recommended') }}</div>
                    </div>
                  </a>
                <a class="bg-stone-700 p-4 rounded-lg flex items-center cursor-not-allowed opacity-60">
                    <!-- <img src="/images/atlauncher-logo.png" alt="ATLauncher Logo" class="h-8 w-8 mr-3" /> -->
                    <div>
                        <div class="font-bold">ATLauncher</div>
                        <div class="text-xs text-gray-400">{{ $t('join.steps.step1.not_available') }}</div>
                    </div>
                </a>
                </div>
              </div>
            </div>
          </div>

          <div class="bg-stone-800 rounded-lg p-6">
            <div class="flex items-start">
              <div class="bg-blue-500 rounded-full w-8 h-8 flex items-center justify-center text-white font-bold mr-4 mt-1">2</div>
              <div>
                <h3 class="text-xl font-bold mb-2">{{ $t('join.steps.step2.title') }}</h3>
                <p class="text-gray-300 mb-4">
                  {{ $t('join.steps.step2.description') }}
                </p>
                <a 
                  href="#" 
                  class="bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg flex items-center justify-center"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  {{ $t('join.steps.step2.button') }}
                </a>
              </div>
            </div>
          </div>

          <div class="bg-stone-800 rounded-lg p-6">
            <div class="flex items-start">
              <div class="bg-blue-500 rounded-full w-8 h-8 flex items-center justify-center text-white font-bold mr-4 mt-1">3</div>
              <div>
                <h3 class="text-xl font-bold mb-2">{{ $t('join.steps.step3.title') }}</h3>
                <p class="text-gray-300 mb-4">
                  {{ $t('join.steps.step3.description') }}
                </p>
                <div class="bg-yellow-800 bg-opacity-30 p-4 rounded-lg border-l-4 border-yellow-500">
                  <div class="flex">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-yellow-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p class="text-gray-300">{{ $t('join.steps.step3.tip') }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="bg-stone-800 rounded-lg p-6">
            <div class="flex items-start">
              <div class="bg-blue-500 rounded-full w-8 h-8 flex items-center justify-center text-white font-bold mr-4 mt-1">4</div>
              <div>
                <h3 class="text-xl font-bold mb-2">{{ $t('join.steps.step4.title') }}</h3>
                <p class="text-gray-300 mb-4">
                  {{ $t('join.steps.step4.description') }}
                </p>
                <div class="bg-green-800 bg-opacity-30 p-4 rounded-lg border-l-4 border-green-500">
                  <div class="flex">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <p class="text-gray-300">{{ $t('join.steps.step4.success') }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const copySuccess = ref(false);

const copyServerAddress = () => {
  navigator.clipboard.writeText('play.diamonddynasty.net');
  copySuccess.value = true;
  setTimeout(() => {
    copySuccess.value = false;
  }, 3000);
};
</script>
