
'use client';

export default function WarrantyPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Warranty Information</h1>
        
        <div className="space-y-8">
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Our Warranty Promise</h2>
            <div className="bg-blue-50 p-6 rounded-lg mb-6">
              <p className="text-lg font-medium text-blue-800 mb-2">Quality Guaranteed</p>
              <p className="text-blue-700">
                Motor Elite stands behind every part we sell with comprehensive warranty coverage and dedicated support.
              </p>
            </div>
            <p className="text-gray-600">
              We understand that reliability is crucial when it comes to automotive parts. That's why we offer extensive warranty coverage on all our products, giving you peace of mind with every purchase.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Warranty Coverage by Category</h2>
            <div className="grid gap-6">
              <div className="border border-gray-200 rounded-lg p-6">
                <h3 className="font-semibold text-xl mb-3 text-blue-600">Engine Components</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium mb-2">Complete Engines</h4>
                    <p className="text-gray-600 text-sm">36 months / 100,000 miles</p>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Engine Parts</h4>
                    <p className="text-gray-600 text-sm">24 months / 50,000 miles</p>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Gaskets & Seals</h4>
                    <p className="text-gray-600 text-sm">12 months / 25,000 miles</p>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Filters</h4>
                    <p className="text-gray-600 text-sm">12 months / 15,000 miles</p>
                  </div>
                </div>
              </div>

              <div className="border border-gray-200 rounded-lg p-6">
                <h3 className="font-semibold text-xl mb-3 text-green-600">Transmission & Drivetrain</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium mb-2">Complete Transmissions</h4>
                    <p className="text-gray-600 text-sm">36 months / 100,000 miles</p>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Transmission Parts</h4>
                    <p className="text-gray-600 text-sm">24 months / 50,000 miles</p>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Driveshafts & Axles</h4>
                    <p className="text-gray-600 text-sm">24 months / 60,000 miles</p>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Universal Joints</h4>
                    <p className="text-gray-600 text-sm">18 months / 36,000 miles</p>
                  </div>
                </div>
              </div>

              <div className="border border-gray-200 rounded-lg p-6">
                <h3 className="font-semibold text-xl mb-3 text-purple-600">Suspension & Steering</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium mb-2">Shocks & Struts</h4>
                    <p className="text-gray-600 text-sm">24 months / 50,000 miles</p>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Control Arms</h4>
                    <p className="text-gray-600 text-sm">24 months / 60,000 miles</p>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Ball Joints</h4>
                    <p className="text-gray-600 text-sm">18 months / 36,000 miles</p>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Tie Rod Ends</h4>
                    <p className="text-gray-600 text-sm">18 months / 36,000 miles</p>
                  </div>
                </div>
              </div>

              <div className="border border-gray-200 rounded-lg p-6">
                <h3 className="font-semibold text-xl mb-3 text-red-600">Braking System</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium mb-2">Brake Rotors</h4>
                    <p className="text-gray-600 text-sm">24 months / 50,000 miles</p>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Brake Pads</h4>
                    <p className="text-gray-600 text-sm">12 months / 25,000 miles</p>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Calipers</h4>
                    <p className="text-gray-600 text-sm">24 months / 50,000 miles</p>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Brake Lines</h4>
                    <p className="text-gray-600 text-sm">36 months / 75,000 miles</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">What's Covered</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-green-50 p-6 rounded-lg">
                <h3 className="font-semibold text-lg mb-3 text-green-800">✓ Covered Defects</h3>
                <ul className="space-y-2 text-green-700">
                  <li>• Manufacturing defects</li>
                  <li>• Material failures</li>
                  <li>• Premature wear under normal use</li>
                  <li>• Workmanship issues</li>
                  <li>• Performance failures</li>
                </ul>
              </div>
              <div className="bg-red-50 p-6 rounded-lg">
                <h3 className="font-semibold text-lg mb-3 text-red-800">✗ Not Covered</h3>
                <ul className="space-y-2 text-red-700">
                  <li>• Normal wear and tear</li>
                  <li>• Damage from accidents</li>
                  <li>• Improper installation</li>
                  <li>• Lack of maintenance</li>
                  <li>• Racing or competition use</li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Filing a Warranty Claim</h2>
            <div className="space-y-4">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-semibold">1</div>
                <div>
                  <h3 className="font-semibold text-lg">Contact Our Warranty Department</h3>
                  <p className="text-gray-600">Call 1-800-MOTOR-01 ext. 3 or email warranty@motorelite.com with your order number and part details.</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-semibold">2</div>
                <div>
                  <h3 className="font-semibold text-lg">Provide Required Information</h3>
                  <p className="text-gray-600">Share your purchase receipt, photos of the defective part, and description of the issue.</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-semibold">3</div>
                <div>
                  <h3 className="font-semibold text-lg">Receive Authorization</h3>
                  <p className="text-gray-600">We'll review your claim and provide a Return Merchandise Authorization (RMA) if approved.</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-semibold">4</div>
                <div>
                  <h3 className="font-semibold text-lg">Return or Replace</h3>
                  <p className="text-gray-600">We'll either send a replacement part or provide instructions for returning the defective item.</p>
                </div>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Extended Warranty Options</h2>
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-lg">
              <h3 className="font-semibold text-xl mb-4">Motor Elite Plus Protection</h3>
              <p className="text-gray-700 mb-4">
                Extend your warranty coverage with our comprehensive protection plans:
              </p>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-white p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">Basic Plus</h4>
                  <p className="text-sm text-gray-600 mb-2">Extends standard warranty by 50%</p>
                  <p className="text-lg font-bold text-blue-600">$29.99</p>
                </div>
                <div className="bg-white p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">Premium Plus</h4>
                  <p className="text-sm text-gray-600 mb-2">Doubles standard warranty period</p>
                  <p className="text-lg font-bold text-blue-600">$49.99</p>
                </div>
                <div className="bg-white p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">Ultimate Plus</h4>
                  <p className="text-sm text-gray-600 mb-2">Lifetime warranty coverage</p>
                  <p className="text-lg font-bold text-blue-600">$99.99</p>
                </div>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Important Terms</h2>
            <div className="bg-yellow-50 p-6 rounded-lg">
              <ul className="space-y-3 text-gray-700">
                <li>• Warranty coverage begins from the date of purchase</li>
                <li>• Original purchase receipt required for all warranty claims</li>
                <li>• Professional installation recommended for complex components</li>
                <li>• Warranty void if part numbers are altered or removed</li>
                <li>• Labor costs not covered unless specified in product description</li>
                <li>• Warranty replacement parts carry remaining warranty period of original part</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Warranty Support</h2>
            <div className="bg-gray-50 p-6 rounded-lg">
              <p className="text-gray-700 mb-4">
                Our dedicated warranty team is here to help resolve any issues quickly and fairly.
              </p>
              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <h3 className="font-semibold mb-1">Warranty Hotline</h3>
                  <p className="text-gray-600">1-800-MOTOR-01 ext. 3</p>
                  <p className="text-sm text-gray-500">Mon-Fri 8AM-6PM EST</p>
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Email Support</h3>
                  <p className="text-gray-600">warranty@motorelite.com</p>
                  <p className="text-sm text-gray-500">24-48 hour response</p>
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Technical Support</h3>
                  <p className="text-gray-600">tech@motorelite.com</p>
                  <p className="text-sm text-gray-500">Installation questions</p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
