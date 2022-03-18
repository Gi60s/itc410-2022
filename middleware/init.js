export default async function init ({ store }) {
  await store.dispatch('accounts/load')
  console.log('loaded')
}