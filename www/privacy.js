(() => {
  const select = document.getElementById('privacy-app');
  if (!select) return;
  const email = document.getElementById('privacy-email');
  const description = document.getElementById('request-description');
  const english = document.documentElement.lang === 'en';
  const spanish = document.documentElement.lang === 'es';
  const apps = {
    blackball: 'Blackball by AJS Studio',
    snooker: 'Snooker By AJS Studio',
    'american-pool': 'AJS American Pool',
    carambole: 'Carom By AJS Studio',
    'dart-club': 'Dart Club By AJS Studio'
  };
  const requested = new URLSearchParams(location.search).get('app');
  if (Object.prototype.hasOwnProperty.call(apps, requested)) select.value = requested;
  function update() {
    const app = Object.prototype.hasOwnProperty.call(apps, select.value) ? apps[select.value] : '';
    const subject = (spanish ? 'Solicitud de eliminación — ' : english ? 'Deletion request — ' : 'Demande de suppression — ') + (app || 'AJS Studio');
    const body = spanish ? 'Hola,\n\nAplicación: ' + (app || '[nombre de la aplicación]') + '\nCorreo de la cuenta o identificador del juego: [completar]\nEliminación solicitada (cuenta y datos asociados, solo la copia de seguridad u otros datos concretos): [completar]\n\nPor favor, confirmen el resultado e indiquen qué datos se conservan, por qué y durante cuánto tiempo.\n\nGracias.' : english
      ? 'Hello,\n\nApplication: ' + (app || '[application name]') + '\nAccount email or game identifier: [complete]\nRequested deletion (account and associated data, backup only, or other specified data): [complete]\n\nPlease confirm the outcome and explain any data retained, its reason and retention period.\n\nThank you.'
      : 'Bonjour,\n\nApplication : ' + (app || '[nom de l’application]') + '\nAdresse du compte ou identifiant de jeu : [à compléter]\nSuppression souhaitée (compte et données associées, sauvegarde seule ou autres données précisées) : [à compléter]\n\nMerci de confirmer le traitement et de préciser les éventuelles données conservées, leur justification et leur durée de conservation.\n\nMerci.';
    email.href = 'mailto:contact@ajsstudio.fr?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
    description.textContent = app
      ? (spanish ? 'Solicitud sobre ' : english ? 'Request about ' : 'Demande concernant ') + app + '. ' + (spanish ? 'Revisarás y enviarás el mensaje desde tu propia aplicación de correo.' : english ? 'You will review and send the message from your own email app.' : 'Vous vérifierez et enverrez le message depuis votre propre messagerie.')
      : (spanish ? 'Elige una aplicación o indícala directamente en tu correo.' : english ? 'Choose an application, or specify it directly in your email.' : 'Choisissez une application, ou précisez-la directement dans votre e-mail.');
  }
  select.addEventListener('change', update);
  update();
})();

