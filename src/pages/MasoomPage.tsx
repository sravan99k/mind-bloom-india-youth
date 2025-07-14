
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Shield, Heart, Phone, AlertTriangle, Users, FileText, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Footer from "@/components/Footer";

const MasoomPage = () => {
  const [activeSection, setActiveSection] = useState<'intro' | 'cyberbullying' | 'csa'>('intro');

  const handleCall = (number: string) => {
    window.location.href = `tel:${number}`;
  };

  const CyberbullyingContent = () => (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Cyberbullying Awareness</h2>
        <p className="text-lg text-gray-600">Understanding and preventing online harassment</p>
      </div>

      <Card className="border-blue-200 bg-blue-50">
        <CardHeader>
          <CardTitle className="text-xl text-blue-900">What is Cyberbullying?</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-blue-800 leading-relaxed mb-4">
            Cyberbullying is when someone uses phones, computers, or social media to hurt, 
            embarrass, or scare another person. This can include:
          </p>
          <ul className="space-y-2 text-blue-800">
            <li className="flex items-start">
              <span className="text-blue-600 mr-2">•</span>
              Sending mean messages or comments
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 mr-2">•</span>
              Sharing embarrassing photos or videos without permission
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 mr-2">•</span>
              Spreading rumors or lies online
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 mr-2">•</span>
              Excluding someone from online groups on purpose
            </li>
          </ul>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-xl text-gray-900">Prevention Tips</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3 text-gray-700">
            <li className="flex items-start">
              <span className="text-blue-600 mr-2">✓</span>
              Think before you post - would you say it face-to-face?
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 mr-2">✓</span>
              Keep passwords private and change them regularly
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 mr-2">✓</span>
              Only accept friend requests from people you actually know
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 mr-2">✓</span>
              Use privacy settings to control who can contact you
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 mr-2">✓</span>
              Report and block users who are being mean to you
            </li>
          </ul>
        </CardContent>
      </Card>

      <Card className="border-red-200 bg-red-50">
        <CardHeader>
          <CardTitle className="text-xl text-red-900 flex items-center gap-2">
            <Phone className="w-5 h-5" />
            Get Help Now
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { name: "Cyber Crime Helpline", number: "1930", desc: "Report cyberbullying and online crimes" },
              { name: "Childline India", number: "1098", desc: "Help for children in difficult situations" }
            ].map((contact, index) => (
              <div key={index} className="p-3 bg-white rounded border border-red-200">
                <div className="font-medium text-red-800">{contact.name}</div>
                <div className="text-sm text-red-600 mb-2">{contact.desc}</div>
                <Button
                  size="sm"
                  onClick={() => handleCall(contact.number)}
                  className="w-full bg-red-600 hover:bg-red-700"
                >
                  Call {contact.number}
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const CSAContent = () => (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Child Sexual Abuse Awareness</h2>
        <p className="text-lg text-gray-600">Understanding, preventing, and responding to child sexual abuse</p>
      </div>

      <Card className="border-red-200 bg-red-50">
        <CardHeader>
          <CardTitle className="text-xl text-red-900">Basic Facts About Child Sexual Abuse</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4 text-red-800">
            <div className="p-4 bg-white rounded border border-red-200">
              <h4 className="font-semibold mb-2">Myth vs. Reality</h4>
              <p className="mb-2"><strong>FALSE:</strong> Sexual abuse generally occurs in unfamiliar surroundings by strangers</p>
              <p><strong>FACT:</strong> 85% of abuse occurs in known surroundings (home/school) by known people (family/relatives or family friends)</p>
            </div>
            <div className="p-4 bg-white rounded border border-red-200">
              <h4 className="font-semibold mb-2">Who is Affected?</h4>
              <p className="mb-2"><strong>Girls:</strong> 53% of victims</p>
              <p><strong>Boys:</strong> 47% of victims</p>
              <p className="text-sm mt-2">Both girls and boys can be victims of sexual abuse</p>
            </div>
            <div className="p-4 bg-white rounded border border-red-200">
              <h4 className="font-semibold mb-2">Most Vulnerable Ages</h4>
              <p className="mb-1">• Most vulnerable: 3-8 years and 11-15 years</p>
              <p>• Most reported cases: 5-12 years</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-xl text-gray-900">What is Child Sexual Abuse?</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-700 leading-relaxed mb-4">
            Child Sexual Abuse is involvement of a child in sexual activity:
          </p>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-start">
              <span className="text-red-600 mr-2">•</span>
              That he/she does not fully comprehend
            </li>
            <li className="flex items-start">
              <span className="text-red-600 mr-2">•</span>
              Is unable to give informed consent
            </li>
            <li className="flex items-start">
              <span className="text-red-600 mr-2">•</span>
              Where the child is not developmentally prepared
            </li>
            <li className="flex items-start">
              <span className="text-red-600 mr-2">•</span>
              That violates laws or social taboos of society
            </li>
          </ul>
        </CardContent>
      </Card>

      <Card className="border-orange-200 bg-orange-50">
        <CardHeader>
          <CardTitle className="text-xl text-orange-900">Warning Signs</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <h4 className="font-semibold text-orange-800 mb-2">Behavioral Signs</h4>
              <ul className="text-sm text-orange-700 space-y-1">
                <li>• Sudden unexplained fears</li>
                <li>• Fear of being touched</li>
                <li>• Changes in academic performance</li>
                <li>• Self-injury</li>
                <li>• Sleep disturbances</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-orange-800 mb-2">Physical Signs</h4>
              <ul className="text-sm text-orange-700 space-y-1">
                <li>• Problems walking or sitting</li>
                <li>• Pain in stomach/genital areas</li>
                <li>• Frequent urinary tract infections</li>
                <li>• Strong body odor</li>
                <li>• Sores around mouth</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-orange-800 mb-2">Emotional Signs</h4>
              <ul className="text-sm text-orange-700 space-y-1">
                <li>• Extreme anger</li>
                <li>• Anxiety, depression</li>
                <li>• Low self-esteem</li>
                <li>• Tics, phobias</li>
                <li>• Obsessions</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-blue-200 bg-blue-50">
        <CardHeader>
          <CardTitle className="text-xl text-blue-900">POCSO Act (2012) - Legal Protection</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-blue-800 mb-4">
            The Protection of Children from Sexual Offences Act provides protection to all children under 18 years:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className="p-3 bg-white rounded border border-blue-200">
              <h4 className="font-semibold text-blue-800 mb-2">Offences & Punishments</h4>
              <ul className="text-blue-700 space-y-1">
                <li>• Sexual Assault: 3-5 years</li>
                <li>• Penetrative Sexual Assault: 7 years to Life</li>
                <li>• Sexual Harassment: 3 years</li>
                <li>• Child Pornography: 5-7 years</li>
              </ul>
            </div>
            <div className="p-3 bg-white rounded border border-blue-200">
              <h4 className="font-semibold text-blue-800 mb-2">Key Features</h4>
              <ul className="text-blue-700 space-y-1">
                <li>• Non-bailable offence</li>
                <li>• Child-friendly procedures</li>
                <li>• Media cannot disclose identity</li>
                <li>• Burden of proof on accused</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-green-200 bg-green-50">
        <CardHeader>
          <CardTitle className="text-xl text-green-900">What Can We Do?</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-semibold text-green-800 mb-2">Tell the Child</h4>
              <ul className="text-green-700 space-y-1">
                <li>• It is never their fault</li>
                <li>• You will believe and protect them</li>
                <li>• You will never reject or punish them</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-green-800 mb-2">Teach the Child</h4>
              <ul className="text-green-700 space-y-1">
                <li>• About inappropriate touch</li>
                <li>• About boundaries and consent</li>
                <li>• How to tell a safe adult</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-red-200 bg-red-50">
        <CardHeader>
          <CardTitle className="text-xl text-red-900 flex items-center gap-2">
            <Phone className="w-5 h-5" />
            Emergency Helplines
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { name: "Childline India", number: "1098", desc: "24/7 helpline for children" },
              { name: "Emergency Services", number: "112", desc: "Police, Fire, Medical Emergency" },
              { name: "Women Helpline", number: "181", desc: "Support for harassment and abuse" },
              { name: "Police Helpline", number: "100", desc: "Report crimes immediately" }
            ].map((contact, index) => (
              <div key={index} className="p-3 bg-white rounded border border-red-200">
                <div className="font-medium text-red-800">{contact.name}</div>
                <div className="text-sm text-red-600 mb-2">{contact.desc}</div>
                <Button
                  size="sm"
                  onClick={() => handleCall(contact.number)}
                  className="w-full bg-red-600 hover:bg-red-700"
                >
                  Call {contact.number}
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="border-purple-200 bg-purple-50">
        <CardHeader>
          <CardTitle className="text-xl text-purple-900">Our Pledge</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center p-6 bg-white rounded border border-purple-200">
            <h3 className="font-bold text-purple-800 mb-4">I PLEDGE TO KEEP CHILDREN SAFE BY:</h3>
            <div className="text-purple-700 space-y-2">
              <p>• Learning about personal safety of children</p>
              <p>• Talking to children about child safety</p>
              <p>• Ensuring neighborhood safety for children</p>
              <p>• Supporting any victim of abuse I come across</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="max-w-6xl mx-auto p-6 py-12">
        {/* Header with Logos */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-6 space-x-8">
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">Yi</div>
              <div className="text-sm text-gray-600">Young Indians</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">MASOOM</div>
              <div className="text-sm text-gray-600">Making Schools Safe</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">CII</div>
              <div className="text-sm text-gray-600">Confederation of Indian Industry</div>
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            SAVE CHILDHOOD
          </h1>
          <h2 className="text-2xl font-semibold text-blue-600 mb-2">
            FIGHT AGAINST CHILD SEXUAL ABUSE
          </h2>
        </div>

        {activeSection === 'intro' && (
          <div className="space-y-8">
            {/* About Section */}
            <Card className="border-blue-200 bg-blue-50">
              <CardHeader>
                <CardTitle className="text-2xl text-blue-900 flex items-center gap-2">
                  <Users className="w-6 h-6" />
                  About Our Organizations
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="p-4 bg-white rounded border border-blue-200">
                    <h3 className="font-bold text-orange-600 mb-2">Young Indians (Yi)</h3>
                    <p className="text-sm text-gray-700">
                      Young Indians is the youth wing of the Confederation of Indian Industry (CII). 
                      We are a movement of young leaders committed to building a better India through 
                      active citizenship and social responsibility.
                    </p>
                  </div>
                  <div className="p-4 bg-white rounded border border-blue-200">
                    <h3 className="font-bold text-blue-600 mb-2">MASOOM</h3>
                    <p className="text-sm text-gray-700">
                      MASOOM (Making Schools Safe) is an initiative focused on creating safer 
                      environments for children in schools. We work to educate, prevent, and respond 
                      to various forms of abuse and harassment affecting children.
                    </p>
                  </div>
                  <div className="p-4 bg-white rounded border border-blue-200">
                    <h3 className="font-bold text-purple-600 mb-2">CII</h3>
                    <p className="text-sm text-gray-700">
                      The Confederation of Indian Industry is a premier business association that 
                      works to create and sustain an environment conducive to the development of India, 
                      partnering with industry, government, and civil society.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Mission Statement */}
            <Card className="border-green-200 bg-green-50">
              <CardHeader>
                <CardTitle className="text-xl text-green-900 flex items-center gap-2">
                  <Heart className="w-5 h-5" />
                  Our Mission
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-green-800 leading-relaxed text-center text-lg">
                  Together, we are committed to creating a safer world for children by raising awareness, 
                  providing education, and building support systems to prevent child abuse and cyberbullying. 
                  Every child deserves to grow up in a safe, supportive environment where they can thrive 
                  and reach their full potential.
                </p>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card 
                className="border-blue-200 bg-blue-50 hover:bg-blue-100 cursor-pointer transition-colors"
                onClick={() => setActiveSection('cyberbullying')}
              >
                <CardHeader>
                  <CardTitle className="text-xl text-blue-900 flex items-center gap-3">
                    <Shield className="w-8 h-8" />
                    <div className="flex-1">
                      Cyberbullying Awareness
                      <CardDescription className="text-blue-700 mt-1">
                        Learn about online safety and prevention
                      </CardDescription>
                    </div>
                    <ArrowRight className="w-5 h-5 text-blue-600" />
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-blue-800">
                    Understanding cyberbullying, its impact, and how to protect yourself and others online. 
                    Learn practical strategies for staying safe in digital spaces.
                  </p>
                </CardContent>
              </Card>

              <Card 
                className="border-red-200 bg-red-50 hover:bg-red-100 cursor-pointer transition-colors"
                onClick={() => setActiveSection('csa')}
              >
                <CardHeader>
                  <CardTitle className="text-xl text-red-900 flex items-center gap-3">
                    <Shield className="w-8 h-8" />
                    <div className="flex-1">
                      Child Sexual Abuse Prevention
                      <CardDescription className="text-red-700 mt-1">
                        Critical awareness and protection information
                      </CardDescription>
                    </div>
                    <ArrowRight className="w-5 h-5 text-red-600" />
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-red-800">
                    Essential information about recognizing, preventing, and responding to child sexual abuse. 
                    Understanding your rights and available support systems.
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Statistics Alert */}
            <Alert className="border-yellow-200 bg-yellow-50">
              <AlertTriangle className="h-4 w-4 text-yellow-600" />
              <AlertDescription className="text-yellow-800">
                <strong>Did you know?</strong> Only 47% of children report abuse. It's crucial that we create 
                safe environments where children feel comfortable seeking help. Every adult has a role to play 
                in protecting children.
              </AlertDescription>
            </Alert>
          </div>
        )}

        {activeSection === 'cyberbullying' && (
          <div>
            <Button 
              onClick={() => setActiveSection('intro')} 
              variant="outline" 
              className="mb-6"
            >
              ← Back to Main Page
            </Button>
            <CyberbullyingContent />
          </div>
        )}

        {activeSection === 'csa' && (
          <div>
            <Button 
              onClick={() => setActiveSection('intro')} 
              variant="outline" 
              className="mb-6"
            >
              ← Back to Main Page
            </Button>
            <CSAContent />
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default MasoomPage;
