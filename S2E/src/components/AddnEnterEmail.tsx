import React, { useState } from 'react';
import { IonButton, IonFab, IonFabButton, IonIcon, IonInput, IonItem, IonList, IonText } from '@ionic/react';
import { add } from 'ionicons/icons';

interface AddnEnterEmailProps {
  emails: string[];
  updateEmails: (emails: string[]) => void;
}

const AddnEnterEmail: React.FC<AddnEnterEmailProps> = ({ emails, updateEmails }) => {
  const [showEmailForm, setShowEmailForm] = useState(false);
  const [email, setEmail] = useState('hello@prosperasoft.com'); // Input email value

  const toggleEmailForm = () => {
    setShowEmailForm(!showEmailForm);
  };

  // Function to handle button click and save email to localStorage
  const handleAddEmail = () => {
    if (email.trim()) {
      // Check if email already exists
      if (!emails.includes(email)) {
        const updatedEmails = [...emails, email]; // Add new email to the array
        updateEmails(updatedEmails); // Update the emails via prop function
        setEmail('hello@prosperasoft.com'); // Clear input after adding
        setShowEmailForm(false); // Hide the email form
      } else {
        alert('Email already exists.');
      }
    } else {
      alert('Please enter a valid email.');
    }
  };

  return (
    <>
      <IonFab slot="fixed" vertical="bottom" horizontal="end">
        <IonFabButton onClick={toggleEmailForm}>
          <IonIcon icon={add}></IonIcon>
        </IonFabButton>
      </IonFab>

      {showEmailForm && (
        <IonFab slot="fixed" vertical="center" horizontal="center">
          <IonList>
            <IonItem>
              <IonInput
                labelPlacement="floating"
                value={email}
                onIonInput={(e: { detail: { value: string; }; }) => setEmail(e.detail.value)}
              >
                <div slot="label">
                  Email <IonText color="danger">(Required)</IonText>
                </div>
              </IonInput>
              <IonButton size="default" onClick={handleAddEmail}>
                Add
              </IonButton>
            </IonItem>
          </IonList>
        </IonFab>
      )}
    </>
  );
};

export default AddnEnterEmail;
