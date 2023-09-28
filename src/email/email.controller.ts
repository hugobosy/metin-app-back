import { Controller, Inject } from '@nestjs/common';
import { EmailService } from './email.service';

@Controller()
export class EmailController {
  constructor(@Inject(EmailService) private emailService: EmailService) {}
}
