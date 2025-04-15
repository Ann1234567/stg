// src/stores/scoring.js
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useScoringStore = defineStore('scoring', () => {
  const scores = ref([])
  const currentScore = ref(null)

  const submitScore = (scoreData) => {
    scores.value.push({
      id: Date.now(),
      ...scoreData,
      date: new Date().toISOString()
    })
  }

  const getScoreById = (id) => {
    return scores.value.find(score => score.id === id)
  }

  return {
    scores,
    currentScore,
    submitScore,
    getScoreById
  }
})