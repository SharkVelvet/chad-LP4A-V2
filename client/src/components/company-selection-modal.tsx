import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface CompanySelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const companies = [
  {
    name: "State Farm",
    logo: "https://logos-world.net/wp-content/uploads/2020/11/State-Farm-Logo.png",
    website: "https://www.statefarm.com"
  },
  {
    name: "Geico",
    logo: "https://logos-world.net/wp-content/uploads/2020/11/GEICO-Logo.png",
    website: "https://www.geico.com"
  },
  {
    name: "Progressive",
    logo: "https://logos-world.net/wp-content/uploads/2020/11/Progressive-Logo.png",
    website: "https://www.progressive.com"
  },
  {
    name: "Allstate",
    logo: "https://logos-world.net/wp-content/uploads/2020/11/Allstate-Logo.png",
    website: "https://www.allstate.com"
  },
  {
    name: "USAA",
    logo: "https://logos-world.net/wp-content/uploads/2020/11/USAA-Logo.png",
    website: "https://www.usaa.com"
  },
  {
    name: "Liberty Mutual",
    logo: "https://logos-world.net/wp-content/uploads/2020/11/Liberty-Mutual-Logo.png",
    website: "https://www.libertymutual.com"
  },
  {
    name: "Farmers",
    logo: "https://logos-world.net/wp-content/uploads/2020/11/Farmers-Insurance-Logo.png",
    website: "https://www.farmers.com"
  },
  {
    name: "Nationwide",
    logo: "https://logos-world.net/wp-content/uploads/2020/11/Nationwide-Logo.png",
    website: "https://www.nationwide.com"
  },
  {
    name: "American Family",
    logo: "https://logos-world.net/wp-content/uploads/2020/11/American-Family-Insurance-Logo.png",
    website: "https://www.amfam.com"
  },
  {
    name: "Travelers",
    logo: "https://logos-world.net/wp-content/uploads/2020/11/Travelers-Logo.png",
    website: "https://www.travelers.com"
  },
  {
    name: "Plan|right",
    logo: "/attached_assets/planright-logo.svg",
    website: "/internal-one",
    isDefault: true
  }
];

export function CompanySelectionModal({ isOpen, onClose }: CompanySelectionModalProps) {
  const handleCompanySelect = (website: string) => {
    if (website.startsWith('http')) {
      window.open(website, '_blank');
    } else {
      window.location.href = website;
    }
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center mb-6">
            Select Your Insurance Company
          </DialogTitle>
        </DialogHeader>
        
        <div className="text-center mb-8">
          <p className="text-lg text-gray-600 leading-relaxed">
            We currently work with the following organizations and have specific branding templates according to each company. 
            Click on your company logo to start the process with branded templates designed specifically for your organization.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {companies.map((company) => (
            <Button
              key={company.name}
              variant="outline"
              className={`h-32 p-4 flex flex-col items-center justify-center hover:bg-gray-50 transition-colors ${
                company.isDefault ? 'ring-2 ring-[#6458AF] bg-purple-50' : ''
              }`}
              onClick={() => handleCompanySelect(company.website)}
            >
              <div className="h-16 w-full mb-2 flex items-center justify-center">
                {company.name === "Plan|right" ? (
                  <div className="text-2xl font-bold text-[#6458AF]">Plan|right</div>
                ) : (
                  <img
                    src={company.logo}
                    alt={`${company.name} Logo`}
                    className="max-h-12 max-w-full object-contain"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      const parent = target.parentElement;
                      if (parent) {
                        parent.innerHTML = `<div class="text-sm font-semibold text-gray-700">${company.name}</div>`;
                      }
                    }}
                  />
                )}
              </div>
              <span className="text-sm font-medium text-gray-700 text-center">
                {company.name}
              </span>
            </Button>
          ))}
        </div>

        <div className="text-center mt-8 p-4 bg-purple-50 rounded-lg">
          <p className="text-sm text-gray-600">
            <strong>Default Option:</strong> Plan|right offers comprehensive insurance website solutions for independent agents and agencies.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}