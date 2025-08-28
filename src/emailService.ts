// EmailJS utility for sending emails from the contact form
import emailjs from '@emailjs/browser';

export const sendEmail = async (formData: { name: string; email: string; subject: string; message: string }) => {
  const serviceId = 'service_0wo9rvx';
  const templateId = 'template_e1xfzzr';
  const publicKey = 'LPGb3u7LfMoKTkNhQ';

  const templateParams = {
    from_name: formData.name,
    from_email: formData.email,
    subject: formData.subject,
    message: formData.message,
  };

  return emailjs.send(serviceId, templateId, templateParams, publicKey);
};
