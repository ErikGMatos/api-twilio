import 'dotenv/config';
import { jwt } from 'twilio';

class TokenController {
  async store(req, res) {
    const { identity } = req.query;
    if (!identity) {
      return res.status(401).json({ error: 'Nome do usuário é obrigatório.' });
    }
    const { AccessToken } = jwt;
    const { VideoGrant } = AccessToken;

    const MAX_ALLOWED_SESSION_DURATION = 14400;
    const token = new AccessToken(
      process.env.TWILIO_ACCOUNT_SID,
      process.env.TWILIO_API_KEY,
      process.env.TWILIO_API_SECRET,
      { ttl: MAX_ALLOWED_SESSION_DURATION }
    );
    token.identity = identity;
    const grant = new VideoGrant();
    token.addGrant(grant);
    return res.json({ token: token.toJwt() });
  }
}

export default new TokenController();
