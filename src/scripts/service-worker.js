import 'regenerator-runtime'
import CacheHelper from './views/utils/cache-helper'

// Daftar asset yang akan dicaching
const assetsToCache = [
  './',
  './icon/icon-72.png',
  './icon/icon-96.png',
  './icon/icon-128.png',
  './icon/icon-144.png',
  './icon/icon-152.png',
  './icon/icon-192.png',
  './icon/icon-384.png',
  './icon/icon-512.png',
  './hero-image_2.jpg',
  './index.html',
  './icon-logo.png',
  './app.bundle.js',
  './app.webmanifest',
  './sw.bundle.js'
]

self.addEventListener('install', (event) => {
  event.waitUntil(CacheHelper.cachingAppShell([...assetsToCache]))
})

self.addEventListener('activate', (event) => {
  event.waitUntil(CacheHelper.deleteOldCache())
})

self.addEventListener('fetch', (event) => {
  event.respondWith(CacheHelper.revalidateCache(event.request))
})
