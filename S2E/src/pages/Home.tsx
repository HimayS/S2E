import React, { useEffect, useState, useCallback } from 'react';
import { IonContent, IonFab, IonFabButton, IonHeader, IonIcon, IonPage, IonTitle, IonToolbar, useIonToast } from '@ionic/react';
import AddnEnterEmail from '../components/AddnEnterEmail';
import EmailList from '../components/EmailList';
import { AndroidPermissions } from '@awesome-cordova-plugins/android-permissions';
import { playOutline, pauseOutline } from 'ionicons/icons';
import Settings from '../components/Settings';

const Home: React.FC = () => {
  const [present] = useIonToast();
  const [smsWatchStarted, setSmsWatchStarted] = useState(false);
  const [emails, setEmails] = useState<string[]>([]);
  const [settingsData, setSettingsData] = useState({
    fromEmail: '',
    smtpHost: '',
    smtpPort: '',
    smtpSecure: '',
    smtpUser: '',
    smtpPass: '',
  });

  // Request SMS permission for Android
  const requestSMSPermission = useCallback(() => {
    AndroidPermissions.checkPermission(AndroidPermissions.PERMISSION.RECEIVE_SMS)
      .then((result) => {
        if (!result.hasPermission) {
          AndroidPermissions.requestPermission(AndroidPermissions.PERMISSION.RECEIVE_SMS);
        }
      })
      .catch(() => {
        AndroidPermissions.requestPermission(AndroidPermissions.PERMISSION.RECEIVE_SMS);
      });
  }, []);

  // Start watching for incoming SMS
  const startSMSWatch = useCallback(() => {

    // Check if the emails array is empty
    if (!emails || emails.length === 0) {
      console.warn('No emails added, Skipping email notification.');
      window.alert('Please add one or more Receiver Email Id');
      return; // Exit the function early
    }

    // Validate settingsData values before proceeding
    if (
      !settingsData.smtpHost?.trim() ||
      !settingsData.smtpPort?.toString().trim() ||
      !settingsData.smtpUser?.trim() ||
      !settingsData.smtpPass?.trim() ||
      !settingsData.fromEmail?.trim()
    ) {
      window.alert('Invalid SMTP settings (some fields are missing or empty)');
      console.warn('Invalid SMTP settings (some fields are missing or empty), Skipping email notification.');
      return; // Exit the function early
    }

    const { SMSReceive } = window.cordova?.plugins || {};
    if (SMSReceive) {
      SMSReceive.startWatch(
        () => {
          console.log('SMS Watch started successfully');
          present({ message: 'SMS Watch started successfully', duration: 2000, color: 'success' });
          setSmsWatchStarted(true);
        },
        (error: any) => {
          console.error('Failed to start SMS watch', error);
          present({ message: `Failed to start SMS watch: ${error}`, duration: 2000, color: 'danger' });
        }
      );
    } else {
      console.log('SMSReceive plugin not available');
      present({ message: 'SMSReceive plugin not available', duration: 2000, color: 'danger' });
    }
  }, [present, emails, settingsData]);

  // Stop watching for incoming SMS
  const stopSMSWatch = useCallback(() => {
    const { SMSReceive } = window.cordova?.plugins || {};
    if (SMSReceive) {
      SMSReceive.stopWatch(
        () => {
          console.log('SMS Watch stopped successfully');
          present({ message: 'SMS Watch stopped successfully', duration: 2000, color: 'success' });
          setSmsWatchStarted(false);
        },
        (error: any) => {
          console.error('Failed to stop SMS watch', error);
          present({ message: `Failed to stop SMS watch: ${error}`, duration: 2000, color: 'danger' });
        }
      );
    }
  }, [present]);

  // Toggle between starting and stopping the SMS watch
  const toggleSMSWatch = () => {
    if (smsWatchStarted) {
      stopSMSWatch();
    } else {
      startSMSWatch();
    }
  };

  // Handle incoming SMS messages
  const onSMSArrive = useCallback(async (message: any) => {
    console.log('Incoming SMS:', message);

    // Check if the emails array is empty
    if (!emails || emails.length === 0) {
      console.warn('No emails added, Skipping email notification.');
      return; // Exit the function early
    }

    // Validate settingsData values before proceeding
    if (
      !settingsData.smtpHost?.trim() ||
      !settingsData.smtpPort?.toString().trim() ||
      !settingsData.smtpUser?.trim() ||
      !settingsData.smtpPass?.trim() ||
      !settingsData.fromEmail?.trim()
    ) {
      console.warn('Invalid SMTP settings (some fields are missing or empty), Skipping email notification.');
      return; // Exit the function early
    }

    try {
      var mailSettings = {
        emailFrom: settingsData.fromEmail,
        emailTo: emails.join(', '),
        smtp: settingsData.smtpHost,
        port: settingsData.smtpPort,
        smtpUserName: settingsData.smtpUser,
        smtpPassword: settingsData.smtpPass,
        attachments: [],
        subject: "Automatic SMS Notification",
        textBody: `Address: ${message.address}\n\nBody: ${message.body}`
      };

      var success = function (susmsg: any) {
        console.log(susmsg);
      }

      var failure = function (errmsg: any) {
        console.log(`Error from smtp client: ${errmsg}`);
      }

      window.smtpClient.sendMail(mailSettings, success, failure);
    } catch (error) {
      console.error("Error sending email: ", error);
    }

  }, [emails, settingsData]);

  // Initialize SMS watching and request permissions
  useEffect(() => {
    const initSMSWatch = () => {
      requestSMSPermission();
      document.addEventListener('onSMSArrive', onSMSArrive);
    };

    document.addEventListener('deviceready', initSMSWatch);

    return () => {
      document.removeEventListener('deviceready', initSMSWatch);
      document.removeEventListener('onSMSArrive', onSMSArrive);
    };
  }, [onSMSArrive, requestSMSPermission]);

  // Load stored emails from localStorage
  useEffect(() => {
    const storedEmails = JSON.parse(localStorage.getItem('EMAILS') || '[]');
    setEmails(storedEmails);
    const storedSettings = JSON.parse(localStorage.getItem('SETTINGS') || '{}');
    if (storedSettings) {
      setSettingsData(storedSettings);
    }
  }, []);

  // Update email list and save to localStorage
  const updateEmails = (newEmails: string[]) => {
    setEmails(() => newEmails);
    localStorage.setItem('EMAILS', JSON.stringify(newEmails));
  };

  // Handle deletion of an email
  const onDelete = (index: number) => {
    const updatedEmails = emails.filter((_, i) => i !== index);
    updateEmails(updatedEmails);
  };

  // Function to handle the updating of settings data
  const updateSettings = (newData: any) => {
    setSettingsData(newData);
    localStorage.setItem('SETTINGS', JSON.stringify(newData));
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Prosperasoft</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>

        <EmailList emails={emails} onDelete={onDelete} />

        <IonFab slot="fixed" vertical="bottom" horizontal="start">
          <IonFabButton onClick={toggleSMSWatch}>
            {smsWatchStarted ? <IonIcon icon={pauseOutline}></IonIcon> : <IonIcon icon={playOutline}></IonIcon>}
          </IonFabButton>
        </IonFab>

        <Settings settings={settingsData} onUpdateSettings={updateSettings} />

        <AddnEnterEmail emails={emails} updateEmails={updateEmails} />

      </IonContent>
    </IonPage>
  );
};

export default Home;
