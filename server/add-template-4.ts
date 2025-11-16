import { storage } from './storage.js';

async function addTemplate4() {
  try {
    console.log('🔍 Finding chad@fotype.com...');
    const user = await storage.getUserByEmail('chad@fotype.com');
    if (!user) {
      console.error('❌ User not found');
      process.exit(1);
    }
    console.log(`✓ Found user: ${user.email} (ID: ${user.id})`);

    console.log('🔍 Checking if Template 4 exists...');
    const template = await storage.getTemplate(4);
    if (!template) {
      console.error('❌ Template 4 not found');
      process.exit(1);
    }
    console.log(`✓ Found template: ${template.name}`);

    console.log('📄 Creating page for user...');
    const page = await storage.createPage({
      userId: user.id,
      templateId: 4,
      name: `Template 4 - ${new Date().toLocaleDateString()}`,
      subscriptionPlan: 'standard',
      subscriptionStatus: 'active'
    } as any);
    console.log(`✓ Page created (ID: ${page.id})`);

    console.log('📝 Creating default content...');
    await storage.createPageContent({
      pageId: page.id,
      businessName: "",
      tagline: "",
      aboutUs: "",
      phone: "",
      email: user.email,
      address: "",
    });
    console.log('✓ Content created');

    console.log('🎉 Template 4 added successfully!');
    process.exit(0);
  } catch (error: any) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

addTemplate4();
