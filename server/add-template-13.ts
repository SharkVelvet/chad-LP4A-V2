import { storage } from './storage.js';

async function addTemplate13() {
  try {
    console.log('🔍 Finding chad@fotype.com...');
    const user = await storage.getUserByEmail('chad@fotype.com');
    if (!user) {
      console.error('❌ User not found');
      process.exit(1);
    }
    console.log(`✓ Found user: ${user.email} (ID: ${user.id})`);

    console.log('🔍 Checking if Template 13 exists...');
    const template = await storage.getTemplate(13);
    if (!template) {
      console.error('❌ Template 13 not found');
      process.exit(1);
    }
    console.log(`✓ Found template: ${template.name}`);

    console.log('📄 Creating page for user...');
    const page = await storage.createPage({
      userId: user.id,
      templateId: 13,
      name: `Template 13 - ${new Date().toLocaleDateString()}`,
      subscriptionPlan: 'standard',
      subscriptionStatus: 'active' // Auto-activate for super admin
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

    console.log('🎉 Template 13 added successfully!');
    process.exit(0);
  } catch (error: any) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

addTemplate13();
