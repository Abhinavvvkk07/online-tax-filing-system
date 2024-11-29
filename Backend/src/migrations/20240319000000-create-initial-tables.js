'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    // Create Users table
    await queryInterface.createTable('Users', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
      },
      firstName: {
        type: Sequelize.STRING,
        allowNull: false
      },
      lastName: {
        type: Sequelize.STRING,
        allowNull: false
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false
      },
      phoneNumber: Sequelize.STRING,
      dateOfBirth: Sequelize.DATEONLY,
      ssn: {
        type: Sequelize.STRING,
        unique: true
      },
      address: Sequelize.TEXT,
      role: {
        type: Sequelize.ENUM('user', 'admin'),
        defaultValue: 'user'
      },
      isVerified: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      lastLogin: Sequelize.DATE,
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false
      }
    });

    // Create TaxFilings table
    await queryInterface.createTable('TaxFilings', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
      },
      userId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      taxYear: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      filingStatus: {
        type: Sequelize.ENUM(
          'single',
          'married_joint',
          'married_separate',
          'head_of_household',
          'qualifying_widow'
        ),
        allowNull: false
      },
      totalIncome: {
        type: Sequelize.DECIMAL(10, 2),
        defaultValue: 0
      },
      totalDeductions: {
        type: Sequelize.DECIMAL(10, 2),
        defaultValue: 0
      },
      totalCredits: {
        type: Sequelize.DECIMAL(10, 2),
        defaultValue: 0
      },
      taxLiability: {
        type: Sequelize.DECIMAL(10, 2),
        defaultValue: 0
      },
      status: {
        type: Sequelize.ENUM(
          'draft',
          'in_progress',
          'pending_review',
          'completed',
          'rejected'
        ),
        defaultValue: 'draft'
      },
      submissionDate: Sequelize.DATE,
      completionDate: Sequelize.DATE,
      notes: Sequelize.TEXT,
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false
      }
    });

    // Create Documents table
    await queryInterface.createTable('Documents', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
      },
      userId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      taxFilingId: {
        type: Sequelize.UUID,
        references: {
          model: 'TaxFilings',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      documentType: {
        type: Sequelize.ENUM(
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
        type: Sequelize.STRING,
        allowNull: false
      },
      s3Key: {
        type: Sequelize.STRING,
        allowNull: false
      },
      mimeType: {
        type: Sequelize.STRING,
        allowNull: false
      },
      size: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      uploadDate: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      },
      status: {
        type: Sequelize.ENUM('pending', 'verified', 'rejected'),
        defaultValue: 'pending'
      },
      verificationNotes: Sequelize.TEXT,
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false
      }
    });

    // Add indexes
    await queryInterface.addIndex('TaxFilings', ['userId', 'taxYear'], {
      unique: true
    });
  },

  async down(queryInterface, Sequelize) {
    // Drop tables in reverse order
    await queryInterface.dropTable('Documents');
    await queryInterface.dropTable('TaxFilings');
    await queryInterface.dropTable('Users');
  }
};
