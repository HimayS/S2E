import React, { useEffect, useState } from 'react';
import { IonButton, IonFab, IonFabButton, IonIcon, IonInput, IonItem, IonLabel, IonList } from '@ionic/react';
import { settingsOutline } from 'ionicons/icons';

interface SettingsProps {
    settings: {
        fromEmail: string;
        smtpHost: string;
        smtpPort: string;
        smtpSecure: string;
        smtpUser: string;
        smtpPass: string;
    };
    onUpdateSettings: (newData: any) => void;
}

const Settings: React.FC<SettingsProps> = ({ settings, onUpdateSettings }) => {
    const [showSettings, setShowSettings] = useState(false);
    const [localSettings, setLocalSettings] = useState(settings);

    // Update localSettings whenever the settings prop changes
    useEffect(() => {
        setLocalSettings(settings);
    }, [settings]);

    const handleInputChange = (field: string, value: string) => {
        setLocalSettings({ ...localSettings, [field]: value });
    };

    const handleSubmit = () => {
        // Perform validation to ensure all required fields are filled
        if (
            !localSettings.fromEmail.trim() ||
            !localSettings.smtpHost.trim() ||
            !localSettings.smtpPort.trim() ||
            !localSettings.smtpSecure.trim() ||
            !localSettings.smtpUser.trim() ||
            !localSettings.smtpPass.trim()
        ) {
            // Show an alert if any field is missing
            alert("Please fill in all required fields");
            return;
        }
        // Call the parent's update function with the local state
        onUpdateSettings(localSettings);
        setShowSettings(false);
    };

    return (
        <>
            <IonFab slot="fixed" vertical="bottom" horizontal="center">
                <IonFabButton onClick={() => setShowSettings(!showSettings)}>
                    <IonIcon icon={settingsOutline}></IonIcon>
                </IonFabButton>
            </IonFab>

            {showSettings && (

                <IonFab slot="fixed" vertical="center" horizontal="center">
                    <IonList>
                        <IonItem>
                            <IonLabel position="stacked">FROM_WHICH_EMAIL</IonLabel>
                            <IonInput
                                placeholder="Id which used to send mail"
                                value={localSettings.fromEmail}
                                onIonInput={(e: { detail: { value: string; }; }) => handleInputChange('fromEmail', e.detail.value!)}
                                clearInput
                            />
                        </IonItem>
                        <IonItem>
                            <IonLabel position="stacked">SMTP_HOSTNAME</IonLabel>
                            <IonInput
                                placeholder="smtp server hostname or IP"
                                value={localSettings.smtpHost}
                                onIonInput={(e: { detail: { value: string; }; }) => handleInputChange('smtpHost', e.detail.value!)}
                                clearInput
                            />
                        </IonItem>
                        <IonItem>
                            <IonLabel position="stacked">SMTP_PORT</IonLabel>
                            <IonInput
                                placeholder="smtp server port"
                                value={localSettings.smtpPort}
                                onIonInput={(e: { detail: { value: string; }; }) => handleInputChange('smtpPort', e.detail.value!)}
                                clearInput
                            />
                        </IonItem>
                        <IonItem>
                            <IonLabel position="stacked">IS_SECURE</IonLabel>
                            <IonInput
                                placeholder="true for port 465, else false"
                                value={localSettings.smtpSecure}
                                onIonInput={(e: { detail: { value: string; }; }) => handleInputChange('smtpSecure', e.detail.value!)}
                                clearInput
                            />
                        </IonItem>
                        <IonItem>
                            <IonLabel position="stacked">SMTP_USERNAME</IonLabel>
                            <IonInput
                                placeholder="smtp server username"
                                value={localSettings.smtpUser}
                                onIonInput={(e: { detail: { value: string; }; }) => handleInputChange('smtpUser', e.detail.value!)}
                                clearInput
                            />
                        </IonItem>
                        <IonItem>
                            <IonLabel position="stacked">SMTP_PASSWORD</IonLabel>
                            <IonInput
                                placeholder="smtp server password"
                                value={localSettings.smtpPass}
                                onIonInput={(e: { detail: { value: string; }; }) => handleInputChange('smtpPass', e.detail.value!)}
                                clearInput
                            />
                        </IonItem>
                        <IonButton expand="block" onClick={handleSubmit}>
                            Done
                        </IonButton>
                    </IonList>
                </IonFab>
            )}
        </>
    );
};

export default Settings;