export default function noauth({ redirect, store }) {
  if (store.state.accounts.user !== null) {
    return redirect('/')
  }
}