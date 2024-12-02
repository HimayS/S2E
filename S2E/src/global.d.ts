interface MailSettings {
  emailFrom: string;
  emailTo: string;
  smtp: string;
  port: string;
  smtpUserName: string;
  smtpPassword: string;
  attachments: string[];
  subject: string;
  textBody: string;
}

interface Window {
  smtpClient: {
    sendMail(
      mailSettings: MailSettings, 
      success: (message: any) => void, 
      failure: (error: any) => void
    ): void;
  };
  cordova: {
    plugins: {
      SMSReceive: {
        startWatch(success: () => void, failure: (error: any) => void): void;
        stopWatch(success: () => void, failure: (error: any) => void): void;
      };
    };
  }
}
