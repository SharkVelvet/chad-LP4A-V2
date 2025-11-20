import { railwayService } from './railwayService';

async function addDomainToRailway() {
  try {
    console.log('🚂 Adding r2d2insurance.com to Railway...');
    
    const result = await railwayService.addCustomDomain('r2d2insurance.com');
    
    console.log('✅ Success! Domain added to Railway:');
    console.log(JSON.stringify(result, null, 2));
    console.log('\n🎉 r2d2insurance.com should now be live!');
    console.log('Visit https://r2d2insurance.com to verify.');
    
  } catch (error: any) {
    console.error('❌ Error adding domain to Railway:', error.message);
    process.exit(1);
  }
}

addDomainToRailway();
