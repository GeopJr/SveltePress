import 'dart:convert';
import 'dart:ui';
import 'package:sveltepress/title.dart';
import 'package:flutter/material.dart';
import 'package:flutter_html/flutter_html.dart';
import 'package:flutter/foundation.dart';
import 'package:flutter/services.dart';

// Import title from a seperate dart file
// (generated from handlebars)
const String pressTitle = SveltePressMeta.title;

// Class for the special index.json
// generated from the SveltePress data
class PressBundle {
  late String name;
  late List<Posts> posts;

  PressBundle({required this.name, required this.posts});

  PressBundle.fromJson(Map<String, dynamic> json) {
    name = json['name'];
    if (json['posts'] != null) {
      posts = [];
      json['posts'].forEach((v) {
        posts.add(new Posts.fromJson(v));
      });
    }
  }

  Map<String, dynamic> toJson() {
    final Map<String, dynamic> data = new Map<String, dynamic>();
    data['name'] = this.name;
    data['posts'] = this.posts.map((v) => v.toJson()).toList();
    return data;
  }
}

class Posts {
  late bool parent;
  late String name;
  late String html;
  late String id;

  Posts(
      {required this.parent,
      required this.name,
      required this.html,
      required this.id});

  Posts.fromJson(Map<String, dynamic> json) {
    parent = json['parent'];
    name = json['name'];
    html = json['html'];
    id = json['id'];
  }

  Map<String, dynamic> toJson() {
    final Map<String, dynamic> data = new Map<String, dynamic>();
    data['parent'] = this.parent;
    data['name'] = this.name;
    data['html'] = this.html;
    data['id'] = this.id;
    return data;
  }
}

List<PressBundle> parseBundles(String body) {
  final parsed = jsonDecode(body).cast<Map<String, dynamic>>();

  return parsed.map<PressBundle>((json) => PressBundle.fromJson(json)).toList();
}

// Loading the json is async
Future<List<PressBundle>> loadIndex() async {
  final body = await rootBundle.loadString('index.json');

  return compute(parseBundles, body);
}

// Enable click & drag on desktop & web
class ScrollBehavior extends MaterialScrollBehavior {
  @override
  Set<PointerDeviceKind> get dragDevices => {
        PointerDeviceKind.touch,
        PointerDeviceKind.mouse,
      };
}

void main() => runApp(const SveltePressApp());

class SveltePressApp extends StatelessWidget {
  const SveltePressApp({Key? key}) : super(key: key);

  static const appTitle = pressTitle;
  static const svelteOrange = Color.fromARGB(255, 255, 62, 0);

  @override
  Widget build(BuildContext context) {
    // Remvoe the system navbar background
    SystemChrome.setEnabledSystemUIMode(SystemUiMode.edgeToEdge);
    SystemChrome.setSystemUIOverlayStyle(SystemUiOverlayStyle.light
        .copyWith(systemNavigationBarColor: Color(0x00000000)));

    return new MaterialApp(
        title: appTitle,
        theme: ThemeData(
          brightness: Brightness.light,
          primaryColor: svelteOrange,
          colorScheme: ColorScheme.light()
              .copyWith(primary: svelteOrange, secondary: svelteOrange),
        ),
        darkTheme: ThemeData(
          brightness: Brightness.dark,
          primaryColor: svelteOrange,
          colorScheme: ColorScheme.dark()
              .copyWith(primary: svelteOrange, secondary: svelteOrange),
        ),
        home: SveltePressMain(title: appTitle),
        themeMode: ThemeMode.system);
  }
}

class SveltePressMain extends StatefulWidget {
  SveltePressMain({Key? key, required this.title}) : super(key: key);

  final String title;

  @override
  _SveltePressMainState createState() => _SveltePressMainState();
}

class _SveltePressMainState extends State<SveltePressMain> {
  final ValueNotifier<String> _html = ValueNotifier<String>(
      "<h1>Welcome to $pressTitle</h1><br /><h3>Browse the available posts by tapping the hamburger menu at the top left!</h3>");
  // Index used in state for the selected
  // drawer item
  String _selectedIndex = "";

  // Current Tab
  int _lastTab = 0;

  // SingleChildScrollView controller so it
  // scrolls back to the top on html update
  ScrollController _scrollController = new ScrollController(
    keepScrollOffset: false,
  );

  // Future cache(?)
  Future<List<PressBundle>> _future = loadIndex();

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        extendBodyBehindAppBar: true,
        appBar: AppBar(
            title: Text(widget.title),
            shape: BeveledRectangleBorder(
                borderRadius:
                    BorderRadius.only(bottomRight: Radius.circular(20.0)))),
        body: SingleChildScrollView(
            controller: _scrollController,
            child: SafeArea(
              child: new Padding(
                  padding:
                      EdgeInsets.symmetric(vertical: 8.0, horizontal: 16.0),
                  child: ValueListenableBuilder<String>(
                      builder:
                          (BuildContext context, String value, Widget? child) {
                        // _scrollController.jumpTo(0.0);
                        return Html(
                          data: '$value',
                        );
                      },
                      valueListenable: _html)),
            )),
        drawer: ClipPath(
          clipper: ShapeBorderClipper(
            shape: BeveledRectangleBorder(
                borderRadius:
                    BorderRadius.only(bottomRight: Radius.circular(25.0))),
          ),
          child: Drawer(
            child: SafeArea(
              child: FutureBuilder(
                future: _future,
                builder: (BuildContext context,
                    AsyncSnapshot<List<PressBundle>> snapshot) {
                  if (snapshot.hasData) {
                    final List<PressBundle> pressdata = snapshot.data!;
                    return DefaultTabController(
                        length: pressdata.length,
                        initialIndex: _lastTab,
                        child: Column(
                          mainAxisSize: MainAxisSize.max,
                          children: <Widget>[
                            ScrollConfiguration(
                              behavior: ScrollBehavior(),
                              child: Container(
                                width: double.infinity,
                                child: TabBar(
                                    indicatorColor:
                                        Theme.of(context).primaryColor,
                                    isScrollable: true,
                                    labelColor: Theme.of(context).primaryColor,
                                    tabs: [
                                      for (var grandparent in pressdata)
                                        Tab(text: grandparent.name)
                                    ],
                                    onTap: (index) {
                                      _lastTab = index;
                                    }),
                              ),
                            ),
                            Expanded(
                              child: Container(
                                child: TabBarView(children: [
                                  for (int i = 0; i < pressdata.length; i++)
                                    new Container(
                                        child: ListView.builder(
                                      key: PageStorageKey<String>(
                                          'listScrollController'),
                                      controller: new ScrollController(),
                                      padding: EdgeInsets.zero,
                                      itemCount: pressdata[i].posts.length,
                                      itemBuilder: (context, index) {
                                        final post = pressdata[i].posts[index];
                                        // + 1 to avoid 0
                                        // we only care about them being unique
                                        // and reproducable
                                        String currentID = post.id;
                                        return ListTile(
                                            title: new Text(
                                              post.name,
                                              textScaleFactor:
                                                  post.parent ? 1.3 : 1,
                                            ),
                                            dense: !post.parent,
                                            enabled: !post.parent,
                                            selected:
                                                _selectedIndex == currentID,
                                            onTap: () {
                                              _html.value = post.html;
                                              _scrollController.jumpTo(0.0);
                                              _selectedIndex = currentID;
                                              Navigator.pop(context);
                                            });
                                      },
                                    )),
                                ]),
                              ),
                            ),
                          ],
                        ));
                  } else {
                    return new Center(child: CircularProgressIndicator());
                  }
                },
              ),
            ),
          ),
        ));
  }
}
