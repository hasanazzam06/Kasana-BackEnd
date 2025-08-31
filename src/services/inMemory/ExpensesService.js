/* eslint-disable no-underscore-dangle *//* eslint-disable linebreak-style */
class ExpensesService {
  constructor() {
    this._expenses = [
      {
        id: 1, projectId: 'proj-1', date: '2025-08-01', description: 'Pembelian bahan seni', amount: 5000000, category: 'Material', member: 'Budi', status: 'verified', receiptUrl: 'https://placehold.co/600x800/EAE6CC/280A3E?text=Struk+Semen',
      },
      {
        id: 2, projectId: 'proj-1', date: '2025-08-05', description: 'Biaya sewa studio', amount: 8000000, category: 'Operasional', member: 'Ani', status: 'verified', receiptUrl: 'https://placehold.co/600x800/EAE6CC/280A3E?text=Struk+Upah',
      },
      {
        id: 3, projectId: 'proj-1', date: '2025-08-10', description: 'Makan siang tim', amount: 500000, category: 'Konsumsi', member: 'Budi', status: 'pending', receiptUrl: 'https://placehold.co/600x800/EAE6CC/280A3E?text=Struk+Sewa',
      },
      {
        id: 4, projectId: 'proj-2', date: '2025-08-15', description: 'Promosi media sosial', amount: 3500000, category: 'Pemasaran', member: 'Sinta', status: 'verified', receiptUrl: 'https://placehold.co/600x800/EAE6CC/280A3E?text=Struk+Sewa',
      },
      {
        id: 5, projectId: 'proj-2', date: '2025-08-20', description: 'Upah pekerja lepas', amount: 7000000, category: 'SDM', member: 'Ani', status: 'pending', receiptUrl: null,
      },
    ];

    this._project = {
      id: 'proj-1',
      budget: 50000000,
    };

    this.getDashboardDataByProjectId = this.getDashboardDataByProjectId.bind(this);
  }

  getDashboardDataByProjectId() {
    const { budget } = this._project;
    const totalExpenses = this._expenses.reduce((sum, item) => sum + item.amount, 0);
    const remainingBudget = this._project.budget - totalExpenses;
    const verifiedExpenses = this._expenses.filter((e) => e.status === 'verified');
    const totalVerified = verifiedExpenses.reduce((sum, item) => sum + item.amount, 0);
    const totalPending = this._expenses.filter((e) => e.status === 'pending').reduce((sum, item) => sum + item.amount, 0);
    const largestExpense = Math.max(0, ...this._expenses.map((e) => e.amount));

    // --- Data untuk Grafik ---
    const expensesByCategory = verifiedExpenses.reduce((acc, expense) => {
      acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
      return acc;
    }, {});

    const chartData = Object.keys(expensesByCategory).map((category) => ({
      name: category,
      value: expensesByCategory[category],
    }));

    const dailyTrendData = verifiedExpenses.reduce((acc, expense) => {
      const date = new Date(expense.date).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' });
      if (!acc[date]) {
        acc[date] = 0;
      }
      acc[date] += expense.amount;
      return acc;
    }, {});

    const trendChartData = Object.keys(dailyTrendData).map((date) => ({
      date,
      Pengeluaran: dailyTrendData[date],
    })).sort((a, b) => new Date(a.date) - new Date(b.date)); // Pastikan data terurut

    return {
      budget,
      totalExpenses,
      remainingBudget,
      totalVerified,
      totalPending,
      largestExpense,
      chartData,
      trendChartData,
    };
  }

  getListTableByProjectId(projectId) {
    return this._expenses.filter((e) => e.projectId === projectId);
  }

  verifyExpenseById(expenseId) {
    const updateExpense = this._expenses.find((e) => e.id === expenseId);

    if (updateExpense) {
      updateExpense.status = 'verified';
    }
  }
}

module.exports = ExpensesService;
