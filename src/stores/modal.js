import { defineStore } from 'pinia'

export const useModalStore = defineStore({
  id: 'modal',
  state: () => ({
    isOpen: false,
  }),
  actions: {
    modalOpen(open) {
      this.isOpen = this.isOpen = open;
    },
    modalClose(close) {
      this.isOpen = this.isOpen = close;
    }
  }
})
