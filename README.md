
# Create example project
```bash
  npx react-native init MyFood24Test --template react-native-template-typescript
```



Install react native library
```bash
cd MyFood24Test
npm install myfood24-react-native-digibete
```

install pods
in the iOS directory make replace the podfile contents with this
```podfile
# Resolve react_native_pods.rb with node to allow for hoisting

require Pod::Executable.execute_command('node', ['-p',
	'require.resolve(
		"react-native/scripts/react_native_pods.rb",
		{paths: [process.argv[1]]},
	)', __dir__]).strip

  

platform :ios, '13'
prepare_react_native_project!
use_frameworks!

  

target 'MyFood24Test' do
	config = use_native_modules!

	# Flags change depending on the env values.
	flags = get_default_flags()

  

	use_react_native!(
		:path => config[:reactNativePath],
		:hermes_enabled => flags[:hermes_enabled],
		:fabric_enabled => flags[:fabric_enabled],
		# An absolute path to your application root.
		:app_path => "#{Pod::Config.instance.installation_root}/.."
	)

  

	pre_install do |installer|
		installer.pod_targets.each do |pod|
			if pod.name.eql?('RNScreens') || pod.name.eql?('RNCMaskedView')
				def pod.build_type
					Pod::BuildType.static_library
				end
			end
		end
	end

  

	target 'MyFood24TestTests' do
		inherit! :complete
		# Pods for testing
	end

  

	pod 'MyFood24', :git => 'git@github.com:Coherent-Software-myfood24/myfood24-digibete-pod.git', :tag => '1.0.45'

  

	post_install do |installer|
		# https://github.com/facebook/react-native/blob/main/packages/react-native/scripts/react_native_pods.rb#L197-L202
		react_native_post_install(
			installer,
			config[:reactNativePath],
			:mac_catalyst_enabled => false
		)

		__apply_Xcode_12_5_M1_post_install_workaround(installer)
		
		installer.pods_project.build_configurations.each do |config|
			config.build_settings["ONLY_ACTIVE_ARCH"] = "NO"
			config.build_settings['BUILD_LIBRARY_FOR_DISTRIBUTION'] = 'YES'
		end

  

		installer.pods_project.targets.each do |target|
			target.build_configurations.each do |config|
				xcconfig_path = config.base_configuration_reference.real_path
				xcconfig = File.read(xcconfig_path)
				xcconfig_mod = xcconfig.gsub(/DT_TOOLCHAIN_DIR/, "TOOLCHAIN_DIR")
				File.open(xcconfig_path, "w") { |file| file << xcconfig_mod }
			end
		end
		
		installer.pods_project.targets.each do |target|
			target.build_configurations.each do |config|
				config.build_settings['IPHONEOS_DEPLOYMENT_TARGET'] = '13.0'
			end
		end
	end
end
```

then while in the iOS folder run
```bash
pod install
```


Test with in the root folder of the project
```bash
npx react-native run-ios
```


Once you can build the default app with the dependencies installed you can now call them, in `app.tsx` replace the content with this (Your linter may complain but it should run fine)
```typescript
import * as React from 'react';
import { StyleSheet, View, Text, NativeModules, TurboModuleRegistry, Button } from 'react-native';
import { multiply, initMyFood24, divide } from 'myfood24-react-native-digibete';

  

export default function App() {

	const [result, setResult] = React.useState<number | undefined>();

	React.useEffect(() => {
		divide(5,2).then(setResult);
	}, []);

	return (
		<View style={styles.container}>
			<Text>Result: {result}</Text>
			<Button title="Click Me" onPress={()=>{initMyFood24("7VLDR7sI.DCA6x6PIWWmwyrIvon3aWlef2I1KcOCD")}} />
		</View>
	);
}

  

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},

	box: {
		width: 60,
		height: 60,
		marginVertical: 20,
	},

});
```

## Bundle Example apps (Debug)

### Android

```bash
    mkdir ./android/app/src/main/assets/
    touch ./android/app/src/main/assets/index.android
```

```bash
    npx react-native bundle --platform android --dev false --entry-file index.js --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res
```

```bash
    cd android
    ./gradlew app:assembleDebug
```

Then the file should be in
```bash
    ./app/build/outputs/apk/debug/app-debug.apk
```

### iOS (Debug)


in the iOS folder just open the `MyFood24Test.xcworkspace`,
Make sure you have a development team selected in the project file.
select any iOS device (arm64) then click Product -> Archive, select custom (if you're on the newest version of xcode), select adhoc deployment and run through the wizard. this will give you an iPA you can deploy to your phone for testing via https://www.diawi.com/


Made with [create-react-native-library](https://github.com/callstack/react-native-builder-bob)
