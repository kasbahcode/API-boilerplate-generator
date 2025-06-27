#!/usr/bin/env node

const { program } = require('commander');
const chalk = require('chalk');
const figlet = require('figlet');
const { createProject } = require('../src/generator');
const { checkUsageLimit, incrementUsage } = require('../src/usage-tracker');

// Display banner
console.log(
  chalk.cyan(
    figlet.textSync('API Generator', { 
      horizontalLayout: 'default',
      verticalLayout: 'default',
      font: 'Small'
    })
  )
);

console.log(chalk.yellow('🚀 By Mouad @ KasbahCode - FREE Version (Limited to 3 projects)\n'));

program
  .name('api-gen')
  .description('Generate production-ready Node.js/Express API boilerplates')
  .version('1.0.0');

program
  .command('create <project-name>')
  .description('Create a new API boilerplate project')
  .option('-t, --template <type>', 'Template type (basic, auth)', 'basic')
  .action(async (projectName, options) => {
    try {
      // Check if user has reached the free limit
      const canGenerate = await checkUsageLimit();
      
      if (!canGenerate) {
        console.log(chalk.red('\n❌ FREE VERSION LIMIT REACHED'));
        console.log(chalk.yellow('You\'ve generated 3 projects with the free version.'));
        console.log(chalk.cyan('Upgrade to PRO for unlimited generations: contact@kasbahcode.com\n'));
        process.exit(1);
      }

      // Generate the project
      await createProject(projectName, options.template);
      
      // Increment usage counter
      await incrementUsage();
      
      console.log(chalk.green(`\n✅ API boilerplate "${projectName}" created successfully!`));
      console.log(chalk.yellow('\nNext steps:'));
      console.log(`  cd ${projectName}`);
      console.log('  npm install');
      console.log('  cp .env.example .env');
      console.log('  npm run dev\n');
      
    } catch (error) {
      console.error(chalk.red('❌ Error creating project:'), error.message);
      process.exit(1);
    }
  });

program
  .command('status')
  .description('Check your usage status')
  .action(async () => {
    const { getUsageStatus } = require('../src/usage-tracker');
    const status = await getUsageStatus();
    
    console.log(chalk.cyan('\n📊 Usage Status (FREE Version):'));
    console.log(`Projects generated: ${status.used}/3`);
    console.log(`Remaining: ${3 - status.used}`);
    
    if (status.used >= 3) {
      console.log(chalk.red('\n❌ Limit reached! Upgrade to PRO for unlimited access.'));
      console.log(chalk.yellow('Contact: contact@kasbahcode.com\n'));
    } else {
      console.log(chalk.green(`\n✅ You can generate ${3 - status.used} more projects.\n`));
    }
  });

program
  .command('upgrade')
  .description('Get upgrade information')
  .action(() => {
    console.log(chalk.cyan('\n🚀 Upgrade to PRO Version:'));
    console.log(chalk.white('• Unlimited project generation'));
    console.log(chalk.white('• Advanced templates (e-commerce, microservices)'));
    console.log(chalk.white('• Database migration scripts'));
    console.log(chalk.white('• 6 months email support'));
    console.log(chalk.white('• All future updates for 1 year'));
    console.log(chalk.yellow('\n💰 Only $49 - Pay once, use forever!'));
    console.log(chalk.green('📧 Contact: contact@kasbahcode.com\n'));
  });

program.parse(process.argv);

// If no command provided, show help
if (!process.argv.slice(2).length) {
  program.outputHelp();
} 