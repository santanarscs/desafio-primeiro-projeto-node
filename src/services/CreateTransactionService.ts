import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface Request {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ title, value, type }: Request): Transaction {
    const { total } = this.transactionsRepository.getBalance();

    if (!title) {
      throw Error('Transaction missing title');
    }

    if (!(type === 'income' || type === 'outcome')) {
      throw Error('Transaction missing type');
    }

    if (value <= 0) {
      throw Error('Invalid value transaction');
    }

    if (type === 'outcome' && value > total) {
      throw Error('Sorry, you have no balance');
    }
    const transatction = this.transactionsRepository.create({
      title,
      value,
      type,
    });
    return transatction;
  }
}

export default CreateTransactionService;
