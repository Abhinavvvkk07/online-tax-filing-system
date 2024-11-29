const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class TaxFiling extends Model {
    static associate(models) {
      TaxFiling.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'user'
      });
      TaxFiling.hasMany(models.Document, {
        foreignKey: 'taxFilingId',
        as: 'documents'
      });
    }
  }

  TaxFiling.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id'
      }
    },
    taxYear: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 2000,
        max: new Date().getFullYear()
      }
    },
    filingStatus: {
      type: DataTypes.ENUM(
        'single',
        'married_joint',
        'married_separate',
        'head_of_household',
        'qualifying_widow'
      ),
      allowNull: false
    },
    totalIncome: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      defaultValue: 0
    },
    totalDeductions: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: 0
    },
    totalCredits: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: 0
    },
    taxLiability: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: 0
    },
    status: {
      type: DataTypes.ENUM(
        'draft',
        'in_progress',
        'pending_review',
        'completed',
        'rejected'
      ),
      defaultValue: 'draft'
    },
    submissionDate: {
      type: DataTypes.DATE
    },
    completionDate: {
      type: DataTypes.DATE
    },
    notes: {
      type: DataTypes.TEXT
    }
  }, {
    sequelize,
    modelName: 'TaxFiling',
    indexes: [
      {
        unique: true,
        fields: ['userId', 'taxYear']
      }
    ]
  });

  return TaxFiling;
};
