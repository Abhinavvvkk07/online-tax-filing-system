const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Document extends Model {
    static associate(models) {
      Document.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'user'
      });
      Document.belongsTo(models.TaxFiling, {
        foreignKey: 'taxFilingId',
        as: 'taxFiling'
      });
    }
  }

  Document.init({
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
    taxFilingId: {
      type: DataTypes.UUID,
      references: {
        model: 'TaxFilings',
        key: 'id'
      }
    },
    documentType: {
      type: DataTypes.ENUM(
        'w2',
        '1099',
        'receipt',
        'bank_statement',
        'investment_statement',
        'other'
      ),
      allowNull: false
    },
    documentName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    s3Key: {
      type: DataTypes.STRING,
      allowNull: false
    },
    mimeType: {
      type: DataTypes.STRING,
      allowNull: false
    },
    size: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    uploadDate: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    status: {
      type: DataTypes.ENUM('pending', 'verified', 'rejected'),
      defaultValue: 'pending'
    },
    verificationNotes: {
      type: DataTypes.TEXT
    }
  }, {
    sequelize,
    modelName: 'Document'
  });

  return Document;
};
