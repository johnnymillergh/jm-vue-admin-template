import AppUtil from '@/utils/app'

const title = AppUtil.getName().replace(/-/g, ' ').toLocaleUpperCase()

export default function getPageTitle (pageTitle) {
  if (pageTitle) {
    return `${pageTitle} - ${title}`
  }
  return `${title}`
}
