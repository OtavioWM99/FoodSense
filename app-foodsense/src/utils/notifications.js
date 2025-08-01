import * as Notifications from 'expo-notifications';

export async function requestPermissionsAsync() {
  const { status } = await Notifications.requestPermissionsAsync();
  if (status !== 'granted') {
    alert('Você precisa habilitar as notificações para usar este recurso.');
    return false;
  }
  return true;
}
