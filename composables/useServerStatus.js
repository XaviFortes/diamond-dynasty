import { ref, reactive } from 'vue'

// Create a reactive server status object that will be shared across all component instances
const serverStatus = reactive({
  isLoading: true,
  isOnline: false,
  playerCount: 0,
  maxPlayers: 0,
  version: '1.19.2',
  lastChecked: null,
  error: null
})

// Use a ref to track if we've already fetched the status
const hasInitialized = ref(false)

export function useServerStatus() {
  // Function to fetch server status
  const fetchServerStatus = async () => {
    try {
      serverStatus.isLoading = true
      serverStatus.error = null

      // Using mcsrvstat.us API to check server status
      const response = await fetch(`https://api.mcsrvstat.us/3/diamonddynasty.kratoshost.com`)
      const data = await response.json()
      
      serverStatus.isOnline = data.online === true
      if (serverStatus.isOnline && data.players) {
        serverStatus.playerCount = data.players?.online || 0
        serverStatus.maxPlayers = data.players?.max || 0
        serverStatus.version = data.version || '1.19.2'
      }
      
      serverStatus.lastChecked = new Date()
    } catch (error) {
      console.error('Error fetching server status:', error)
      serverStatus.isOnline = false
      serverStatus.error = error.message
    } finally {
      serverStatus.isLoading = false
      hasInitialized.value = true
    }
  }

  // Copy to clipboard functionality
  const copySuccess = ref(false)
  
  const copyServerAddress = () => {
    navigator.clipboard.writeText('diamonddynasty.kratoshost.com')
    copySuccess.value = true
    setTimeout(() => {
      copySuccess.value = false
    }, 3000)
  }

  // Initialize if not already done
  if (!hasInitialized.value) {
    fetchServerStatus()
    
    // Set up polling interval - we'll keep it minimal to reduce API calls
    const pollInterval = setInterval(fetchServerStatus, 120000) // Poll every 2 minutes
    
    // If using Nuxt 3, we can clean up when app instance is destroyed
    if (process.client) {
      const nuxtApp = useNuxtApp()
      nuxtApp.hook('app:destroyed', () => {
        clearInterval(pollInterval)
      })
    }
  }

  // Manual refresh function
  const refreshStatus = () => {
    // Only allow refresh if last check was more than 30 seconds ago
    const now = new Date()
    if (!serverStatus.lastChecked || (now - serverStatus.lastChecked) > 30000) {
      fetchServerStatus()
    }
  }

  return {
    serverStatus,
    copySuccess,
    copyServerAddress,
    refreshStatus
  }
}