<template>
  <div v-if="oneUnit" class="bg-stone-700 rounded-lg py-1.5 px-3 flex items-center space-x-3">
    <!-- One-unit layout - everything in a single row -->
    <div :class="[serverStatus.isOnline ? 'bg-green-500' : 'bg-red-500', 'w-2 h-2 rounded-full animate-pulse']"></div>
    
    <div class="font-mono text-xs">diamonddynasty.kratoshost.com</div>
    
    <div class="flex items-center ml-auto">
      <div class="text-blue-400 font-medium text-sm">
        {{ serverStatus.playerCount }}/{{ serverStatus.maxPlayers }}
      </div>
      
      <button 
        v-if="showCopy"
        @click="copyServerAddress" 
        class="ml-2 text-gray-400 hover:text-blue-300"
        :title="$t('serverStatus.copy_address')"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
        </svg>
      </button>
      
      <button 
        v-if="showRefresh"
        @click="refreshStatus" 
        class="ml-2 text-gray-400 hover:text-blue-300"
        :title="$t('serverStatus.refresh')"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
      </button>
    </div>
    
    <div v-if="copySuccess" class="absolute top-full left-1/2 transform -translate-x-1/2 mt-1 bg-green-800 text-green-100 px-2 py-0.5 rounded text-xs">
      {{ $t('serverStatus.copied') }}
    </div>
  </div>

  <div v-else :class="[
    'bg-stone-700 rounded-lg overflow-hidden', 
    compact ? 'p-3' : 'p-5'
  ]">
    <!-- Status Header -->
    <div :class="['flex items-center', compact ? 'justify-between mb-1' : 'justify-center mb-3']">
      <div class="flex items-center">
        <div :class="[serverStatus.isOnline ? 'bg-green-500' : 'bg-red-500', 'w-2 h-2 rounded-full mr-1.5 animate-pulse']"></div>
        <span :class="[compact ? 'text-xs' : 'font-medium text-base']">
          {{ serverStatus.isOnline ? $t('serverStatus.online') : $t('serverStatus.offline') }}
        </span>
      </div>
      <button 
        v-if="showRefresh" 
        @click="refreshStatus" 
        class="text-blue-400 hover:text-blue-300 p-0.5 rounded-full"
        :title="$t('serverStatus.refresh')"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
      </button>
    </div>
    
    <!-- Loading State -->
    <div v-if="serverStatus.isLoading" class="text-center py-2">
      <div class="flex space-x-1 justify-center items-center">
        <div class="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce"></div>
        <div class="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce" style="animation-delay: 0.2s"></div>
        <div class="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce" style="animation-delay: 0.4s"></div>
      </div>
    </div>
    
    <!-- Online State -->
    <div v-else-if="serverStatus.isOnline" class="text-center">
      <!-- Player Count -->
      <div class="flex items-center justify-center">
        <div :class="['font-bold text-blue-400', compact ? 'text-lg' : 'text-2xl']">
          {{ serverStatus.playerCount }}/{{ serverStatus.maxPlayers }}
        </div>
        <span v-if="compact" class="text-xs text-gray-400 ml-1.5">{{ $t('serverStatus.players') }}</span>
      </div>
      <div v-if="!compact" class="text-xs text-gray-400">{{ $t('serverStatus.players_online') }}</div>
      
      <!-- Detailed Info (Non-compact mode) -->
      <div v-if="!compact" class="mt-3">
        <!-- Server Address -->
        <div class="py-1.5 px-2 bg-stone-800 rounded-md flex items-center justify-between">
          <span class="text-xs">{{ $t('serverStatus.address') }}</span>
          <div class="flex items-center">
            <span class="mr-1.5 text-xs font-mono">diamonddynasty.kratoshost.com</span>
            <button 
              @click="copyServerAddress" 
              class="text-blue-400 hover:text-blue-300"
              :title="$t('serverStatus.copy_address')"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
            </button>
          </div>
        </div>
        
        <!-- Copy Success Message -->
        <div v-if="copySuccess" class="text-xs text-green-400 mt-1 text-center">
          {{ $t('serverStatus.copied') }}
        </div>
        
        <!-- Version Info -->
        <div class="mt-3 text-xs text-gray-400">
          <div class="flex justify-between">
            <span>{{ $t('serverStatus.version') }}</span>
            <span class="font-medium">{{ serverStatus.version }}</span>
          </div>
          
          <!-- Last Updated -->
          <div v-if="showLastUpdated && serverStatus.lastChecked" class="flex justify-between text-xs text-gray-500 mt-1">
            <span>{{ $t('serverStatus.last_updated') }}</span>
            <span>{{ formatTime(serverStatus.lastChecked) }}</span>
          </div>
        </div>
      </div>
      
      <!-- Compact mode - version info -->
      <div v-else-if="compact && showVersion" class="text-xs text-gray-500 mt-0.5">
        {{ serverStatus.version }}
      </div>
    </div>
    
    <!-- Offline State -->
    <div v-else class="text-center py-2">
      <div class="text-red-300 text-xs">{{ $t('serverStatus.server_offline') }}</div>
      <div v-if="!compact" class="text-xs text-gray-400 mt-1">{{ $t('serverStatus.check_back') }}</div>
    </div>
  </div>
</template>

<script setup>
import { useServerStatus } from '~/composables/useServerStatus'

// Props to make the component flexible for different layouts
const props = defineProps({
  compact: {
    type: Boolean,
    default: false
  },
  oneUnit: {
    type: Boolean,
    default: false
  },
  showRefresh: {
    type: Boolean,
    default: true
  },
  showCopy: {
    type: Boolean,
    default: true
  },
  showLastUpdated: {
    type: Boolean,
    default: false
  },
  showVersion: {
    type: Boolean,
    default: false
  }
})

// Use our composable for server status
const { serverStatus, copySuccess, copyServerAddress, refreshStatus } = useServerStatus()

// Format the last updated time
const formatTime = (date) => {
  if (!date) return ''
  
  const now = new Date()
  const diff = Math.floor((now - date) / 1000) // difference in seconds
  
  if (diff < 60) {
    return `${diff}s`
  } else if (diff < 3600) {
    return `${Math.floor(diff / 60)}m`
  } else {
    return `${Math.floor(diff / 3600)}h`
  }
}
</script>