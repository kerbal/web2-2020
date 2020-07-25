export default class BankService {
  static async getBankInfo (bank_id) {
    if (bank_id === 'PIGGY') {
      return ({
        name: 'Piggy',
      });
    }
    return ({
      name: 'Nah',
    });
  }
}
