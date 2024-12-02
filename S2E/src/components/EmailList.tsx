import React from 'react';
import { IonButton, IonContent, IonIcon, IonItem, IonLabel, IonList } from '@ionic/react';
import { trash } from 'ionicons/icons';

interface EmailListProps {
  emails: string[];
  onDelete: (index: number) => void; // Add the onDelete prop type
}

const EmailList: React.FC<EmailListProps> = ({ emails, onDelete }) => {
  return (
    <IonContent color="light">
      <IonList inset={true}>
        {emails.length > 0 ? (
          emails.map((email, index) => (
            <IonItem key={index}>
              <IonLabel>{email}</IonLabel>
              <IonButton 
                size="default" 
                fill="clear" 
                slot="end"
                onClick={() => onDelete(index)} // Pass index to the onDelete handler
              >
                <IonIcon icon={trash} />
              </IonButton>
            </IonItem>
          ))
        ) : (
          <IonItem>
            <IonLabel>No Emails Found</IonLabel>
          </IonItem>
        )}
      </IonList>
    </IonContent>
  );
};

export default EmailList;


