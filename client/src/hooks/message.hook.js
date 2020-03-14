import { useCallback } from 'react'
//hook used window.M.toast for showing message
export const useMessage = () => {
  return useCallback(text => {
    if (window.M && text) {
      window.M.toast({ html: text })
    }
  }, [])
}